const express = require('express')
const AuthRoutes = express.Router()

const { discordAuth, twitchAuth } = require('../Controllers/auth.controllers')

AuthRoutes.get('/discord', discordAuth)
AuthRoutes.get('/twitch', twitchAuth)

module.exports = AuthRoutes
