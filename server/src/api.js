const superagent = require('superagent')

const DISCORD_API = 'https://discord.com/api/v10'

module.exports.discordExchange = async function (code, uri) {
  return await superagent
    .post(`${DISCORD_API}/oauth2/token`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: uri,
    })
}

module.exports.discordIdentify = async function (access_token) {
  return await superagent
    .get(`${DISCORD_API}/users/@me`)
    .set('Authorization', `Bearer ${access_token}`)
}

module.exports.twitchIdentify = async function (access_token) {
  return await superagent
    .get(`https://api.twitch.tv/helix/users`)
    .set('Authorization', `Bearer ${access_token}`)
    .set('Client-Id', process.env.TWITCH_CLIENT_ID)
}

module.exports.twitchExchange = async function (code, uri) {
  return await superagent
    .post('https://id.twitch.tv/oauth2/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: uri,
    })
}
