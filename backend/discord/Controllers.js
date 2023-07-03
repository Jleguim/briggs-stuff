const superagent = require('superagent')
const url = require('url')

const User = require('../models/User.model')

module.exports.redirect = (req, res) => res.sendStatus(200)

module.exports.exchange = async function(req, res) {
  var exchangeResponse = await superagent
    .post('https://discord.com/api/v10/oauth2/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.baseUrl + '/redirect'
      })
    })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))

  if (exchangeResponse.status != 200) {
    return res.status(401).send(exchangeResponse.body)
  }

  const { access_token, refresh_token } = exchangeResponse.body
  const userData = await getUserData(access_token)

  if (!userData) return res.sendStatus(401)

  const user = await User.findOrCreateByDiscord(userData.id, {
    discordId: userData.id,
    access_token: access_token,
    refresh_token: refresh_token
  })

  await User.findByIdAndUpdate(user._id, {
    discordId: userData.id,
    access_token: access_token,
    refresh_token: refresh_token
  })

  res.send({
    discordId: user.discordId,
    id: user._id,
    access_token: access_token,
    refresh_token: refresh_token
  })
}

module.exports.refresh = async function(req, res) {
  var refreshResponse = await superagent
    .post('https://discord.com/api/v10/oauth2/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: req.query.refresh_token
    })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))

  if (refreshResponse.status != 200) {
    return res.status(401).send(refreshResponse.body)
  }

  const { access_token, refresh_token } = refreshResponse.body
  const userData = await getUserData(access_token)

  if (!userData) return res.sendStatus(401)

  const user = await User.findOrCreateByDiscord(userData.id, {
    discordId: userData.id,
    access_token: access_token,
    refresh_token: refresh_token
  })

  await User.findByIdAndUpdate(user._id, {
    discordId: userData.id,
    access_token: access_token,
    refresh_token: refresh_token
  })

  res.send({
    discordId: user.discordId,
    id: user._id,
    access_token: access_token,
    refresh_token: refresh_token
  })
}

module.exports.revoke = async function(req, res) {
  var revokeResponse = await superagent
    .post('https://discord.com/api/v10/oauth2/token/revoke')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      token: req.query.access_token
    })
    .ok(res => res.status < 500)
    .catch(err => console.log(err))

  if (revokeResponse.status != 200) {
    return res.status(401).send(revokeResponse.body)
  }

  res.sendStatus(200)
}

async function getUserData(access_token) {
  var userResponse = await superagent
    .get('https://discord.com/api/v10/users/@me')
    .set('Authorization', 'Bearer ' + access_token)
    .ok(res => res.status < 500)
    .catch(err => console.log(err))

  if (userResponse.status != 200) {
    return undefined
  }

  return userResponse.body
}
