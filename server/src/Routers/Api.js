const express = require('express')
const ApiRoutes = express.Router()

const { verifyJWT, getUser, setupApiServices } = require('../middleware')

ApiRoutes.use('/', verifyJWT, getUser, setupApiServices)

ApiRoutes.get('/twitch/me', async function (req, res) {
  var meResponse = await req.twitchApi.get('/users')
  if (meResponse.statusCode == 401) {
    // refresh that shit token
    res.sendStatus(401)
    return console.log('DEAD TOKEN 💀')
  }
  res.send(meResponse.body)
})

ApiRoutes.get('/discord/me', async function (req, res) {
  var meResponse = await req.discordApi.get('/users/@me')
  if (meResponse.statusCode == 401) {
    // refresh that shit token
    res.sendStatus(401)
    return console.log('DEAD TOKEN 💀')
  }
  res.send(meResponse.body)
})

// ApiRoutes.get('/clips', async function (req, res) {
//   var clips = await req.twitchApi.getClips()
//   res.send(clips)
// })

module.exports = ApiRoutes
