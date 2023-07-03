const url = require('url')

module.exports.getRedirectUri = function(req, res, next) {
  req.redirect_uri = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.baseUrl + '/redirect'
  })

  req.discordOauthUrl = url.format({
    protocol: 'https',
    host: 'discord.com',
    pathname: 'oauth2/authorize',
    query: {
      response_type: 'code',
      prompt: 'consent',
      client_id: process.env.CLIENT_ID,
      scope: ['identify'],
      redirect_uri: encodeURI(req.redirect_uri)
    }
  })

  next()
}
