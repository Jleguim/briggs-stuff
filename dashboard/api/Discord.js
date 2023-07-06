const superagent = require('superagent')
const { Storage } = require('../Storage')

const DiscordUri = 'https://discord.com/api/v10/'

async function getUserData() {
  var endpoint = DiscordUri + 'users/@me'
  var response = await superagent
    .get(endpoint)
    .set('Authorization', 'Bearer ' + Storage.get('access_token'))
    .ok(res => res.status < 500)
    .catch(err => console.log(err))
  return response.body
}

module.exports = {
  getUserData
}
