const express = require('express')
const AuthRoutes = express.Router()

const controllers = require('./Controllers')

AuthRoutes.get('/redirect', controllers.redirect)
AuthRoutes.get('/exchange_code', controllers.exchange)
AuthRoutes.get('/refresh_token', controllers.refresh)
AuthRoutes.get('/revoke_token', controllers.revoke)

module.exports = AuthRoutes
