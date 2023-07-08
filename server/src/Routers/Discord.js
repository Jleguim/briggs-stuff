const express = require('express')
const DiscordRoutes = express.Router()

const Controllers = require('../Controllers/Discord')

// DiscordRoutes.get('/', Controllers.redirect)
// DiscordRoutes.get('/oauth2/callback', Controllers.callback)
DiscordRoutes.get('/redirect', Controllers.redirect)
DiscordRoutes.get('/auth', Controllers.auth)

module.exports = DiscordRoutes
