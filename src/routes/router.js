const express = require("express")
const router = express.Router()

const Jwt = require('../Auth/auth')
const UserController = require("../controller/userController")
router.post('/newUser', UserController.newUser)
router.post('/auth', Jwt.authorization)

module.exports = router