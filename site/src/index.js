const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../.env') })

const PORT = process.env.PORT
const app = express()

var jsDir = path.join(__dirname, 'public/js')
app.use('/js', express.static(jsDir))

function sendFile(file, res) {
  var filePath = path.join(__dirname, 'public/views', file)
  res.sendFile(filePath)
}

app.get('/', (req, res) => sendFile('index.html', res))
app.get('/auth', (req, res) => sendFile('auth.html', res))
app.get('/dashboard', (req, res) => sendFile('dashboard.html', res))

app.listen(PORT, async () => {
  console.log('Listening on %d', PORT)
})
