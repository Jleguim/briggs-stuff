const superagent = require('superagent')

module.exports.exchange_code = async function(code, redirect_uri) {
  var endpoint = 'https://discord.com/api/v10/oauth2/token'
  var response = await superagent
    .post(endpoint)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri
    })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))

  return response
}

module.exports.refresh_token = async function(refresh_token) {
  var endpoint = 'https://discord.com/api/v10/oauth2/token'
  var response = await superagent
    .post(endpoint)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))

  return response
}

module.exports.revoke_token = async function(access_token) {
  var endpoint = 'https://discord.com/api/v10/oauth2/token/revoke'
  var response = await superagent
    .post(endpoint)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      token: access_token
    })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))

  return response
}

// module.exports.authorization_info = async function(access_token) {
//   var endpoint = 'https://discord.com/api/v10/oauth2/@me'
//   var response = await superagent
//     .get(endpoint)
//     .set('Authorization', 'Bearer ' + access_token)
//     .ok(res => res.status < 500)
//     .catch(err => console.log(err))

//   return response
// }
