const superagent = require('superagent')
const { Storage, Data } = require('../Storage')

const ApiUri = 'http://localhost:1337/'

async function getMyResources() {
  var endpoint = ApiUri + 'resource/@me'
  var response = await superagent
    .get(endpoint)
    .set('Authorization', Data.get('bearerToken'))
    .ok(res => res.status < 500)
    .catch(err => console.log(err))
  return response.body
}

module.exports = {
  getMyResources
}
