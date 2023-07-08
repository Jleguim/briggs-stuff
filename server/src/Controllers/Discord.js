const url = require('url')
const jwt = require('jsonwebtoken')

const api = require('../api')
const User = require('../Models/User.model')

module.exports.auth = async function(req, res) {
  try {
    var code = req.query.code
    var uri = req.query.uri

    var response = await api.exchange(code, uri)
    var tokens = response.body

    var response = await api.identify(tokens.access_token)
    var discordData = response.body

    var user = await User.findOne({ discord_id: discordData.id })
    if (!user) user = await User.create({ discord_id: discordData.id })

    var parsedData = { user_id: user._id, tokens }
    var token = jwt.sign(parsedData, process.env.JWT_SECRET, { expiresIn: '3 Days' })

    res.send(token)
  } catch (err) {
    res.sendStatus(401)
    console.log(err.response.body || err)
  }
}

module.exports.redirect = function(req, res) {
  var authorization_uri = url.format({
    host: 'discord.com',
    protocol: 'https',
    pathname: '/oauth2/authorize',
    query: {
      client_id: process.env.CLIENT_ID,
      response_type: 'code',
      scope: ['identify'],
      redirect_uri: encodeURI(req.query.uri),
      test: true
    }
  })
  res.redirect(authorization_uri)
}
