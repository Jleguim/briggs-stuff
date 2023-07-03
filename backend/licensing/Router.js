const express = require('express')
const LicensingRoutes = express.Router()

const controllers = require('./Controllers')
const { isAuthorized } = require('../Auth.middleware')

LicensingRoutes.get('/@me', isAuthorized, controllers.getLicensesCreatedByMe)

// LicensingRoutes.post('/create/:resourceId', isAuthorized, controllers.createLicense)
// LicensingRoutes.delete('/delete/:resourceId', isAuthorized, controllers.deleteLicense)

LicensingRoutes.put('/renew', isAuthorized, controllers.renewLicense)
LicensingRoutes.put('/activate', controllers.activateLicense)
LicensingRoutes.get('/validate', controllers.validateLicense)

module.exports = LicensingRoutes
