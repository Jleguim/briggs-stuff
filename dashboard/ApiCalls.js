const superagent = require('superagent')

const Storage = require('./Storage')

const api = 'http://localhost:1337/'
const discordApi = 'https://discord.com/api/v10/'

module.exports.exchange_code = async function(code) {
  var endpoint = api + 'discord/exchange_code'
  var response = await superagent
    .get(endpoint)
    .query({ code })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))

  if (response.status == 200) {
    return response.body
  }

  console.log({
    status: response.status,
    body: response.body
  })
}

module.exports.getUserData = async function() {
  var endpoint = discordApi + 'users/@me'
  var response = await superagent
    .get(endpoint)
    .set('Authorization', 'Bearer ' + Storage.get('access_token'))
    .ok(res => res.status < 500)
    .catch(err => console.log(err))
  return response.body
}

module.exports.refresh_token = async function() {
  var endpoint = api + 'discord/refresh_token'
  var response = await superagent
    .get(endpoint)
    .query({ refresh_token: Storage.get('refresh_token') })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))
  return response.body
}
