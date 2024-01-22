const express = require('express')
const ApiRoutes = express.Router()

const { verifyJWT, getUser, twitchApi, discordApi } = require('../middleware')
const { getCurrentUser } = require('../Controllers/api.controllers')

ApiRoutes.use('/', verifyJWT, getUser)

ApiRoutes.use('/discord', discordApi)
ApiRoutes.get('/discord/me', getCurrentUser)

ApiRoutes.use('/twitch', twitchApi)
ApiRoutes.get('/twitch/me', getCurrentUser)

module.exports = ApiRoutes
