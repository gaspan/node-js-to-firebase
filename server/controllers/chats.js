//belum fix
//add data personalChat ok

var firebase = require('../config/firebase')
var router = require('express').Router()

var database = firebase.database()

database.goOnline()

router
  // get all personalChat ok
  // .get('/', function (req, res) {
  //   var ref = database.ref('/personalChat');
  //   ref.once('value', function(snapshot) {
  //     res.json(snapshot.val());
  //   }, function(errorObject) {
  //     res.json('The chat failed: ' + errorObject.code);
  //   })
  // })

  //get all personalChat seorang user
  // .get('/', function(req, re) {
  //   var ref = database.ref('/user/chats/personalChat/Members')
  //   ref.orderByChild('idperson1').equalTo(3).once('child_added', function(snapshot) {
  //     res.json(snapshot.key());
  //   }, function(errorObject) {
  //     res.json('No Chat from that user: ' + errorObject.code );
  //   })
  // })


  //add post personalChat (ok)
  .post('/', function (req, res) {
    //variable yang di post
    var senderId = req.body.senderId;
    var receiperId = req.body.receiperId;
    var nameSender = req.body.nameSender;
    var nameReceiper = req.body.nameReceiper;
    var text = req.body.text;
    var createAt = req.body.createAt;

    //references to database, insert ke chat db receiperId
    var ref = database.ref('/personalChat/' + receiperId + '/' + senderId);
    ref.push({
        senderId: senderId,
        nameSender: nameSender,
        receiperId: receiperId,
        nameReceiper: nameReceiper,
        text: text,
        createAt: createAt
    })
    //references to database, insert ke chat db sender
    var ref = database.ref('/personalChat/' + senderId + '/' + receiperId);
    ref.push({
        senderId: senderId,
        nameSender: nameSender,
        receiperId: receiperId,
        nameReceiper: nameReceiper,
        text: text,
        createAt: createAt
    })
    .then(function () {
        res.status(201).send('OK');
      })
      .catch(function(error) {
        res.json('add chat failed: ' + error.code)
    })
  })

  //get data chat user to user (ok)
  .post('/person/:id', function (req, res) {
    var idpersonchat = req.params.id;
    var idPersonSpoken = req.body.idPersonSpoken;
    var ref = database.ref('/personalChat/' + idpersonchat + '/' + idPersonSpoken);
    ref.once('value', function(snapshot) {
      res.json(snapshot.val());
    }, function(errorObject) {
      res.json('The chat failed: ' + errorObject.code);
    })
  })

router.route('/:id')
      //update data
      // .put(function (req, res) {
      //   var id = req.params.id;
      //   database.ref('/user/chats/' + id + '/text').set({
      //     text: req.body.text
      //   })
      //   .then(function () {
      //     res.status(201).send('OK');
      //   })
      //   .catch(function(error) {
      //     res.json('update data failed: ' + error.code)
      //   })
      // })


      //delete one data
      // .delete((req, res) => {
      //       var id = req.params.id;
      //       var ref = database.ref('/user');
      //       var delRef = ref.child('/chats/' + id)
      //       var hapus = delRef.remove()
      //       .then(function () {
      //         // return res.json('key :' + id + ' was deleted')
      //         res.status(201).send('OK. key :' + id + ' was deleted');
      //       })
      //     .catch(function(error) {
      //       res.json('delete chat failed: ' + errorObject.code)
      //     })
      // })

module.exports = router
