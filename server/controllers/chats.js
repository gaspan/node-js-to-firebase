//belum fix
//add data personalChat ok

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
  //add data personalChat ok
  .post('/', function (req, res) {
    //variable
    var idPerson1 = req.body.idPerson1;
    var idPerson2 = req.body.idPerson2;
    var senderId = req.body.senderId;
    var texT = req.body.text;
    var createAt = req.body.createAt;

    //references to database
    var ref = database.ref('/user/chats/personalChat');
    // Get a key for a new Post.
    var newPostKey = database.ref('/user/chats/').child('personalChat').push().key;

    //add personal member chat
    var members = ref.child(newPostKey + '/Members');
    members.push({
      idperson1: idPerson1,
      idperson2: idPerson2
    });
    //add messages na
    var messages = ref.child(newPostKey + '/Members/Messages');
    messages.push({
      senderid: senderId,
      text: texT,
      createat: createAt
    })
    .then(function () {
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
