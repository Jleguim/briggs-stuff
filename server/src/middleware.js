const jwt = require('jsonwebtoken')

const User = require('./Models/User.model')

module.exports.getUser = async function (req, res, next) {
  try {
    var token = req.jwt
    var user = await User.findById(token.user_id)
    if (!user) throw new Error('No user associated to jwt')

    req.user = user

    next()
  } catch (err) {
    res.sendStatus(401)
    console.log(err.message || err)
  }
}

module.exports.verifyJWT = function (req, res, next) {
  try {
    var token = req.headers.briggs
    var data = jwt.verify(token, process.env.JWT_SECRET)

    req.jwt = data

    next()
  } catch (err) {
    res.sendStatus(401)
    console.log(err.message || err)
  }
}
