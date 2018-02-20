var firebase = require('../config/firebase')
var router = require('express').Router()

// var database = firebase.database()
var database = firebase.database()

database.goOnline()

router
  //get all
  .get('/', function (req, res) {
    var ref = database.ref('/user/user');
    ref.once('value', function(snapshot) {
      res.json(snapshot.val());
    }, function(errorObject) {
      res.json('The read failed: ' + errorObject.code);
    })
  })
  //add data
  .post('/', function (req, res) {
    var ref = database.ref('/user');
    var postRef = ref.child('/user');
    var newPostRef = postRef.push({
      name: req.body.name,
      description: req.body.description
    }).then(function () {
        res.status(201).send('OK');
      })
      .catch(function(error) {
        res.json('add data failed: ' + error.code)
    })
  })

router.route('/:id')
      //update data
      .put(function (req, res) {
        var id = req.params.id;
        database.ref('/user/user/' + id).set({
          name: req.body.name,
          description: req.body.description
        })
        .then(function () {
          res.status(201).send('OK');
        })
        .catch(function(error) {
          res.json('update data failed: ' + error.code)
        })
      })

      //get one data
      .get(function (req, res) {
        var id = req.params.id;
        var ref = database.ref('/user/user/' + id);
        ref.once('value', function(snapshot) {
          res.json(snapshot.val());
        }, function(errorObject) {
          res.json('The read failed: ' + errorObject.code);
        })
      })

      //delete one data
      .delete((req, res) => {
            var id = req.params.id;
            var ref = database.ref('/user');
            var delRef = ref.child('/user/' + id)
            var hapus = delRef.remove()
            .then(function () {
              // return res.json('key :' + id + ' was deleted')
              res.status(201).send('OK. key :' + id + ' was deleted');
            })
          .catch(function(error) {
            res.json('delete data failed: ' + errorObject.code)
          })
      })

module.exports = router
