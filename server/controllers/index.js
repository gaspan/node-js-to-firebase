var router = require('express').Router()
var users = require('./users')

router.use('/users', users)
router.use('/chats', chats)

module.exports = router
