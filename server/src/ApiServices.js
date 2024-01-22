const superagent = require('superagent')

class ApiService {
  name
  ApiUri
  access_token
  client_id

  constructor() {}

  get(path) {
    return superagent
      .get(this.ApiUri + path)
      .set('Authorization', `Bearer ${this.access_token}`)
      .set('Client-Id', this.client_id)
  }
}

class DiscordApiService extends ApiService {
  constructor(OAuthData) {
    super()
    this.name = 'Discord'
    this.ApiUri = 'https://discord.com/api/v10'
    this.client_id = process.env.DISCORD_CLIENT_ID
    this.access_token = OAuthData.access_token
  }

  async getCurrentUser() {
    var meRes = await this.get('/users/@me')
    if (clipsRes.statusCode == 401) {
      // refresh that shit token
      return console.log('DEAD TOKEN 💀')
    }

    return meRes.body
  }
}

class TwitchApiService extends ApiService {
  constructor(OAuthData) {
    super()
    this.name = 'Twitch'
    this.ApiUri = 'https://api.twitch.tv/helix'
    this.client_id = process.env.TWITCH_CLIENT_ID
    this.access_token = OAuthData.access_token
    this.id = OAuthData.id
  }

  async getCurrentUser() {
    var meRes = await this.get('/users')
    if (clipsRes.statusCode == 401) {
      // refresh that shit token
      return console.log('DEAD TOKEN 💀')
    }

    return meRes.body
  }

  // async getClips(id) {
  //   if (!id) id = this.id
  //   var clipsRes = await this.get('/clips').query({ first: 100, broadcaster_id: id })
  //   if (clipsRes.statusCode == 401) {
  //     // refresh that shit token
  //     return console.log('DEAD TOKEN 💀')
  //   }

  //   return clipsRes.body
  // }
}

module.exports = { TwitchApiService, DiscordApiService }
