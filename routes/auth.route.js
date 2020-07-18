const express = require('express')
const validate = require('../validate/user.validate')
const auth = require('../controller/auth.controller')

const router = express.Router()
router.get('/login', auth.login)
router.post('/login', auth.postLogin)

module.exports = router