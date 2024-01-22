const { DiscordOAuthService, TwitchOAuthService } = require('../OAuthServices')

module.exports.discordAuth = async function (req, res) {
  var jwt = await DiscordOAuthService.authenticate(req.query.code, req.query.uri)
  res.send(jwt)
}

module.exports.twitchAuth = async function (req, res) {
  var jwt = await TwitchOAuthService.authenticate(req.query.code, req.query.uri)
  res.send(jwt)
}
