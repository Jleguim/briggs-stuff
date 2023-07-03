const superagent = require('superagent')
const Storage = require('../Storage')

const ApiUri = 'http://localhost:1337/'

async function exchange_code(code) {
  var endpoint = ApiUri + 'discord/exchange_code'
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

async function refresh_token() {
  var endpoint = ApiUri + 'discord/refresh_token'
  var response = await superagent
    .get(endpoint)
    .query({ refresh_token: Storage.get('refresh_token') })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))
  return response.body
}

module.exports = {
  refresh_token,
  exchange_code
}
