const { app, safeStorage } = require('electron')
const fs = require('fs')

var usrDataPath = app.getPath('userData')
var storagePath = usrDataPath + '\\config.json'
var protectedProps = ['access_token', 'refresh_token']

var data = {}

function load() {
  if (!fs.existsSync(storagePath)) return save()
  if (!safeStorage.isEncryptionAvailable()) {
    data = JSON.parse(fs.readFileSync(storagePath))
    return
  }

  var encryptedData = JSON.parse(fs.readFileSync(storagePath))
  var decryptedData = {}
  Object.keys(encryptedData).forEach(key => {
    var prop = encryptedData[key]
    if (protectedProps.includes(key)) {
      var buffer = Buffer.from(prop.data)
      prop = safeStorage.decryptString(buffer)
    }
    decryptedData[key] = prop
  })

  data = decryptedData
}

function save() {
  if (!safeStorage.isEncryptionAvailable()) {
    return fs.writeFileSync(storagePath, JSON.stringify(data, 0, 3))
  }

  var encryptedData = {}
  Object.keys(data).forEach(key => {
    var prop = data[key]
    if (protectedProps.includes(key)) {
      prop = safeStorage.encryptString(prop)
    }
    encryptedData[key] = prop
  })

  fs.writeFileSync(storagePath, JSON.stringify(encryptedData, 0, 3))
}

function get(key) {
  return data[key]
}

function set(key, newData) {
  data[key] = newData
}

module.exports = {
  save,
  load,
  get,
  set
}
