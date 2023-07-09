const express = require('express')
const ApiRoutes = express.Router()

const Controllers = require('../Controllers/Api')
const Middleware = require('../middleware')

ApiRoutes.use('/', Middleware.verifyJWT, Middleware.getUser)

ApiRoutes.get('/discord/identify', Controllers.discord.identify)

ApiRoutes.get('/resources', Controllers.resource.getAll)
ApiRoutes.post('/resources', Controllers.resource.create)
ApiRoutes.get('/resources/:resourceId', Controllers.resource.getOne)
ApiRoutes.patch('/resources/:resourceId', Controllers.resource.update)

module.exports = ApiRoutes
