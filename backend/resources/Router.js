const express = require('express')
const ResourceRoutes = express.Router()

const controllers = require('./Controllers')
const { isAuthorized } = require('../Auth.middleware')

ResourceRoutes.get('/@me', isAuthorized, controllers.getResourcesCreatedByMe)
ResourceRoutes.post('/create', isAuthorized, controllers.createResource)
ResourceRoutes.delete('/:resourceId', isAuthorized, controllers.deleteResource)

ResourceRoutes.post('/:resourceId', isAuthorized, controllers.createLicense)
ResourceRoutes.delete('/:resourceId/:key', isAuthorized, controllers.deleteLicense)

module.exports = ResourceRoutes
