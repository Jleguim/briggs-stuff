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

const AuthRoutes = require('./Routers/auth.routes')
const ApiRoutes = require('./Routers/api.routes')

app.use('/auth', AuthRoutes)
app.use('/api', ApiRoutes)

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to mongo server'))
  .then(() => app.listen(PORT))
  .then(() => console.log('Listening on %d', PORT))
  .catch((err) => {
    throw err
  })
