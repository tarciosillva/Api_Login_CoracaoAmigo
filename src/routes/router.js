const express = require("express")
const router = express.Router()

const Auth = require('../Auth/auth')

router.post('/auth', Auth.authorization)

module.exports = router