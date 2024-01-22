const express = require('express')
const AuthRoutes = express.Router()

const { DiscordOAuthService, TwitchOAuthService } = require('../OAuthServices')

AuthRoutes.get('/discord', function (req, res) {
  DiscordOAuthService.authenticate(req, res)
})

AuthRoutes.get('/twitch', function (req, res) {
  TwitchOAuthService.authenticate(req, res)
})

module.exports = AuthRoutes
