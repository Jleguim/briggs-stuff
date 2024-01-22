const jwt = require('jsonwebtoken')

const api = require('../api')
const User = require('../Models/User.model')

module.exports.discord = async function (req, res) {
  try {
    var code = req.query.code
    var uri = req.query.uri

    var response = await api.discordExchange(code, uri)
    var tokens = response.body

    var response = await api.discordIdentify(tokens.access_token)
    var discordData = response.body

    var user = await User.findOne({ discord_id: discordData.id })
    if (!user) user = await User.create({ discord_id: discordData.id })

    var parsedData = { user_id: user._id }
    var token = jwt.sign(parsedData, process.env.JWT_SECRET, {
      expiresIn: '3 Days',
    })

    res.send(token)
  } catch (err) {
    res.sendStatus(401)
    console.log(err)
  }
}

module.exports.twitch = async function (req, res) {
  try {
    var code = req.query.code
    var uri = req.query.uri

    var response = await api.twitchExchange(code, uri)
    var tokens = response.body

    var response = await api.twitchIdentify(tokens.access_token)
    var twitchData = response.body.data[0]

    var user = await User.findOne({ tw: twitchData.id })
    if (!user) user = await User.create({ tw: twitchData.id })

    var parsedData = { user_id: user._id }
    var token = jwt.sign(parsedData, process.env.JWT_SECRET, {
      expiresIn: '3 Days',
    })

    res.send(token)
  } catch (err) {
    res.sendStatus(401)
    console.log(err)
  }
}
