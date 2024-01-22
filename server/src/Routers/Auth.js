const express = require('express')
const AuthRoutes = express.Router()

const Controllers = require('../Controllers/Auth')

AuthRoutes.get('/discord', Controllers.discord)
AuthRoutes.get('/twitch', Controllers.twitch)

module.exports = AuthRoutes
