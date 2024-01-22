const express = require('express')
const TestRoutes = express.Router()

const { verifyJWT, getUser } = require('../middleware')

const mongoose = require('mongoose')

TestRoutes.use('/api', verifyJWT, getUser)

module.exports = TestRoutes
