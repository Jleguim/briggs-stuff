const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config({ path: path.join(__dirname, '../.env') })

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  console.log(`${req.method} in ${req.path}`)
  next()
})

const DiscordRoutes = require('./Routers/Discord')
const TestRoutes = require('./Routers/Test')

app.use('/discord', DiscordRoutes)
app.use('/test', TestRoutes)

app.listen(PORT, async () => {
  console.log('Listening on %d', PORT)

  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to mongo server')
  } catch (error) {
    throw error
  }
})
