const mongoose = require('mongoose')
const moment = require('moment')

var User = new mongoose.Schema({
  discordId: String,
  access_token: String,
  refresh_token: String,
  resources: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Resource' }],
  creationDate: { type: Date, required: true, default: moment() }
})

User.static('findOrCreateByDiscord', async function(discordId, userDoc) {
  var user = await this.findOne({ discordId })
  if (!user) {
    user = new this(userDoc)
    await user.save()
  }

  return user
})

module.exports = mongoose.model('User', User)
