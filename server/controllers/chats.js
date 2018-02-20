//belum fix
var firebase = require('../config/firebase')
var router = require('express').Router()

var database = firebase.database()

database.goOnline()

router
  //get all personalChat ok
  .get('/', function (req, res) {
    var ref = database.ref('/user/chats/personalChat');
    ref.once('value', function(snapshot) {
      res.json(snapshot.val());
    }, function(errorObject) {
      res.json('The chat failed: ' + errorObject.code);
    })
  })
  //add data
  .post('/', function (req, res) {
    var idSender = req.body.idsender;
    var idReceiper = req.body.idreceiper;
    var name = req.body.name;
    var text = req.body.text;

    //cek apakah sudah ada idSender dan idReceiper
    var ref = database.ref('/user/chats/personalChat')
    ref.orderByChild('idSender').equalTo(idSender).once('child_added', function(snapshot){
      snapshot.
    })
    ref.once('value', function(snapshot) {

    })


    //new

    //
    var ref = database.ref('/user');
    var postRef = ref.child('/chats');
    var newPostRef = postRef.push({
      iduser: req.body.id,
      name: req.body.name,
      text: req.body.text
    }).then(function () {
        res.status(201).send('OK');
      })
      .catch(function(error) {
        res.json('add chat failed: ' + error.code)
    })
  })

router.route('/:id')
      //update data
      .put(function (req, res) {
        var id = req.params.id;
        database.ref('/user/chats/' + id + '/text').set({
          text: req.body.text
        })
        .then(function () {
          res.status(201).send('OK');
        })
        .catch(function(error) {
          res.json('update data failed: ' + error.code)
        })
      })

      //get one chat pc to pc
      .get(function (req, res) {
        var id = req.params.id;
        var ref = database.ref('/user/chats/personalChat' + id);
        ref.once('value', function(snapshot) {
          res.json(snapshot.val());
        }, function(errorObject) {
          res.json('The chat failed: ' + errorObject.code);
        })
      })

      //delete one data
      .delete((req, res) => {
            var id = req.params.id;
            var ref = database.ref('/user');
            var delRef = ref.child('/chats/' + id)
            var hapus = delRef.remove()
            .then(function () {
              // return res.json('key :' + id + ' was deleted')
              res.status(201).send('OK. key :' + id + ' was deleted');
            })
          .catch(function(error) {
            res.json('delete chat failed: ' + errorObject.code)
          })
      })

module.exports = router
