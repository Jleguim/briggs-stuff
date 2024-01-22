const jwt = require('jsonwebtoken')
const superagent = require('superagent')

const User = require('./Models/User.model')

class OAuthService {
  name
  ApiUri
  OAuthUri
  client_id
  client_secret
  identifyUriPath
  identifier

  constructor() {}

  async generateTokens(code, uri) {
    return await superagent
      .post(`${this.OAuthUri ? this.OAuthUri : this.ApiUri}/oauth2/token`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: code,
        redirect_uri: uri,
        grant_type: 'authorization_code',
      })
  }

  async identifyUser(access_token) {
    return await superagent
      .get(this.ApiUri + this.identifyUriPath)
      .set('Authorization', `Bearer ${access_token}`)
      .set('Client-Id', this.client_id)
  }

  parseJWT(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '3 Days',
    })
  }

  parseIdentifyBody(body) {
    return body
  }

  async authenticate(req, res) {
    var tokenRes = await this.generateTokens(req.query.code, req.query.uri)
    var identifyRes = await this.identifyUser(tokenRes.body.access_token)
    var parsedBody = this.parseIdentifyBody(identifyRes.body)

    var filter = { [`${this.identifier.documentPath}`]: parsedBody[`${this.identifier.dataPath}`] }
    var user = await User.findOne(filter)
    if (!user) user = await User.create(filter)
    user.oauth[`${this.name.toLowerCase()}`] = {
      access_token: tokenRes.body.access_token,
      refresh_token: tokenRes.body.refresh_token,
      expires_in: tokenRes.body.expires_in,
      id: parsedBody.id,
    }

    await user.save()
    var jwt = this.parseJWT({ user_id: user._id })
    res.send(jwt)
  }
}

class DiscordOAuthService extends OAuthService {
  constructor() {
    super()
    this.name = 'Discord'
    this.ApiUri = 'https://discord.com/api/v10'
    this.identifyUriPath = '/users/@me'
    this.identifier = {
      documentPath: 'email',
      dataPath: 'email',
    }
    this.client_id = process.env.DISCORD_CLIENT_ID
    this.client_secret = process.env.DISCORD_CLIENT_SECRET
  }
}

class TwitchOAuthService extends OAuthService {
  constructor() {
    super()
    this.name = 'Twitch'
    this.ApiUri = 'https://api.twitch.tv'
    this.OAuthUri = 'https://id.twitch.tv'
    this.identifier = {
      documentPath: 'email',
      dataPath: 'email',
    }
    this.identifyUriPath = '/helix/users'
    this.client_id = process.env.TWITCH_CLIENT_ID
    this.client_secret = process.env.TWITCH_CLIENT_SECRET
  }

  parseIdentifyBody(body) {
    return body.data[0]
  }
}

module.exports.DiscordOAuthService = new DiscordOAuthService()
module.exports.TwitchOAuthService = new TwitchOAuthService()
