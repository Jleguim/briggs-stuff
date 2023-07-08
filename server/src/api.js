const superagent = require('superagent')

const DISCORD_API = 'https://discord.com/api/v10'
const REDIRECT_URI = 'http://localhost:1337/discord/oauth2/callback'

module.exports.exchange = async function(code, uri) {
  return await superagent
    .post(`${DISCORD_API}/oauth2/token`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      // redirect_uri: REDIRECT_URI
      redirect_uri: uri
    })
}

module.exports.identify = async function(access_token) {
  return await superagent.get(`${DISCORD_API}/users/@me`).set('Authorization', `Bearer ${access_token}`)
}
