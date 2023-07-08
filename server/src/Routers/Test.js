const express = require('express')
const TestRoutes = express.Router()

const { verifyJWT, getUser } = require('../middleware')
const api = require('../api')

TestRoutes.get('/api/identify', verifyJWT, getUser, async function(req, res) {
  try {
    var access_token = req.jwt.tokens.access_token
    var response = await api.identify(access_token)
    res.send(response.body)
  } catch (err) {
    res.sendStatus(401)
    console.log(err.response.body || err)
  }
})

module.exports = TestRoutes
