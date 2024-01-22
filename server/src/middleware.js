const jwt = require('jsonwebtoken')

const User = require('./Models/User.model')
const { TwitchApiService, DiscordApiService } = require('./ApiServices')

module.exports.setupApiServices = async function (req, res, next) {
  req.discordApi = new DiscordApiService(req.user.oauth.discord)
  req.twitchApi = new TwitchApiService(req.user.oauth.twitch)
  next()
}

module.exports.getUser = async function (req, res, next) {
  var user = await User.findById(req.jwt.user_id)
  if (!user) throw new Error('No user associated to jwt')
  req.user = user
  next()
}

module.exports.verifyJWT = function (req, res, next) {
  var token = req.headers.jwt
  var data = jwt.verify(token, process.env.JWT_SECRET)
  req.jwt = data
  next()
}
