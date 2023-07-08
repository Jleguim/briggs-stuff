const express = require('express')
const DiscordRoutes = express.Router()

const Controllers = require('../Controllers/Discord')

DiscordRoutes.get('/redirect', Controllers.redirect)
DiscordRoutes.get('/auth', Controllers.auth)

module.exports = DiscordRoutes
