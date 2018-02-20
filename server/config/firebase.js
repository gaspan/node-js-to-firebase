var admin = require('firebase-admin')

var serviceAccount = require('./account-key.json')

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crud-node.firebaseio.com'
})
