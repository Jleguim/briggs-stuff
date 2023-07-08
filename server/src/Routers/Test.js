const express = require('express')
const TestRoutes = express.Router()

function asyncStuff(number = 500) {
  return new Promise((resolve, reject) => {
    var i = 0
    while (i < number) i++
    resolve({ foo: true, bar: 500, baz: { something: 'else' } })
  })
}

const { verifyJWT, getUser } = require('../middleware')

TestRoutes.get('/', verifyJWT, getUser, function(req, res) {
  console.log(req.jwt)
  console.log(req.user)
  res.sendStatus(200)
})

module.exports = TestRoutes
