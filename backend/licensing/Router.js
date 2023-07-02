const express = require('express')
const LicensingRoutes = express.Router()

const controllers = require('./Controllers')

LicensingRoutes.get('/', (req, res) => res.send('Hello world!'))
LicensingRoutes.get('/validate', controllers.validate)
LicensingRoutes.put('/activate', controllers.activate)
LicensingRoutes.post('/generate', controllers.generate)

module.exports = LicensingRoutes
