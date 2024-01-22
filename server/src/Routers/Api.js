const express = require('express')
const ApiRoutes = express.Router()

const { verifyJWT, getUser } = require('../middleware')

ApiRoutes.use('/', verifyJWT, getUser)
ApiRoutes.get('/clips', async function (req, res) {
  var clips = await req.twitchApi.getClips()
  res.send(clips)
})

module.exports = ApiRoutes
