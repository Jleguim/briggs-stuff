const express = require('express')
const DiscordRoutes = express.Router()

const controllers = require('./Controllers')
const middleware = require('./Middleware')

DiscordRoutes.use(middleware.getRedirectUri)

DiscordRoutes.get('/redirect', controllers.redirect)
DiscordRoutes.get('/exchange_code', controllers.exchange_code)
DiscordRoutes.get('/refresh_token', controllers.refresh_token)
DiscordRoutes.get('/revoke_token', controllers.revoke_token)

module.exports = DiscordRoutes
