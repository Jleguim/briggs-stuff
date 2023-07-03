const express = require('express')
const LicensingRoutes = express.Router()

const controllers = require('./Controllers')
const middleware = require('./Middleware')

LicensingRoutes.get('/', controllers.getAll)
LicensingRoutes.post('/create', controllers.create)
LicensingRoutes.put('/activate', middleware.getLicense, controllers.activate)
LicensingRoutes.get('/validate', middleware.getLicense, controllers.validate)
LicensingRoutes.put('/renew', middleware.getLicense, controllers.renew)
LicensingRoutes.delete('/terminate', middleware.getLicense, controllers.terminate)

module.exports = LicensingRoutes
