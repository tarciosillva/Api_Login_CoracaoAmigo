const express = require("express")
const router = express.Router()

const Auth = require('../Auth/auth')
const GoogleController = require('../controller/GoogleController')

router.get('/urlGoogleLogin', GoogleController.getConnectionUrl)
router.post('/validateUser', GoogleController.validateUser)
router.post('/auth', Auth.authorization)

module.exports = router