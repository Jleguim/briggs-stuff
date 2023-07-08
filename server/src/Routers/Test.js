const express = require('express')
const TestRoutes = express.Router()

const api = require('../api')
const { verifyJWT, getUser } = require('../middleware')

const Resource = require('../Models/Resource.model')

TestRoutes.use('/api', verifyJWT, getUser)

TestRoutes.get('/api/identify', async function (req, res) {
  try {
    var access_token = req.jwt.tokens.access_token
    var response = await api.identify(access_token)
    res.send(response.body)
  } catch (err) {
    res.sendStatus(401)
    console.log(err)
  }
})

TestRoutes.post('/api/resource', async function (req, res) {
  try {
    var user = req.user

    var resource = await Resource.create({ name: 'My resource', owner: user._id })
    user.resources.push(resource._id)
    await user.save()

    res.send(resource)
  } catch (err) {
    res.sendStatus(401)
    console.log(err)
  }
})

TestRoutes.get('/api/resource/:resourceId', async function (req, res) {
  try {
    var user = req.user
    var resourceId = req.params.resourceId
    if (!user.resources.includes(resourceId)) return res.send(403)

    var resource = await Resource.findById(resourceId)
    if (!resource) {
      user.resources = user.resources.filter(v => v._id != resourceId)
      await user.save()
      return res.send(403)
    }

    res.send(resource)
  } catch (err) {
    res.sendStatus(401)
    console.log(err)
  }
})

module.exports = TestRoutes
