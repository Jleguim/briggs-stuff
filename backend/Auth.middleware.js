const User = require('./models/User.model')

module.exports.isAuthorized = async function(req, res, next) {
  var bearerToken = req.get('Authorization')
  if (!bearerToken) return res.status(401).send({ err: 'Invalid token' })

  var userId = bearerToken.slice('Bearer '.length)
  var user = await User.findOne({ _id: userId })
  if (!user) return res.status(401).send({ err: 'Invalid token' })

  req._user = user
  next()
}
