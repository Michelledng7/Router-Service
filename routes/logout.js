const express = require('express')
const router = express.Router()
const logoutController= require('../controllers/logoutController')

router.route('/')
    .get(logoutController.handleLogout) //get not post


module.exports = router