const express = require('express')
const TestRoutes = express.Router()

const { verifyJWT, getUser } = require('../middleware')

const Resource = require('../Models/Resource.model')
const License = require('../Models/License.model')
const mongoose = require('mongoose')

TestRoutes.use('/api', verifyJWT, getUser)

TestRoutes.post('/api/resources/:resourceId/license', async function (req, res) {
  try {
    var resource = await Resource.findById(req.params.resourceId)
    if (!resource) return res.sendStatus(404)

    var userObjectId = new mongoose.Types.ObjectId(req.user._id)
    if (!userObjectId.equals(resource.owner)) return res.sendStatus(403)

    var license = await License.create({ resource: resource._id })
    res.send(license)
  } catch (err) {
    res.sendStatus(401)
    console.log(err)
  }
})

module.exports = TestRoutes
