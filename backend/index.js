const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: __dirname + '\\.env' })

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test'
const PORT = process.env.PORT || 1337

const app = express()
app.use(express.json())

const logger = require('./logger.js')
const LicensingRoutes = require('./licensing/Router.js')

app.use('/', logger)
app.use('/licensing', LicensingRoutes)

app.get('/', (req, res) => {
	res.send('Hello world!')
})


app.listen(PORT, async () => {
  console.log('Listening on %d', PORT)

  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to mongo server')
  } catch (error) {
    throw error
  }
})
