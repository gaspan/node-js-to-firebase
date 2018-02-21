var router = require('express').Router()
var users = require('./users')
var chats = require('./chats')

router.use('/users', users)
router.use('/chats', chats)

module.exports = router
