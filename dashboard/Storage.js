const { app, safeStorage } = require('electron')
const fs = require('fs')

class Storage {
  constructor(protectedProps = []) {
    this.storagePath = app.getPath('userData') + '\\config.json'
    this.protectedProps = protectedProps
    this.data = {}
  }

  load() {
    if (!fs.existsSync(this.storagePath)) return save()
    if (!safeStorage.isEncryptionAvailable()) {
      data = JSON.parse(fs.readFileSync(this.storagePath))
      return
    }

    var encryptedData = JSON.parse(fs.readFileSync(this.storagePath))
    var decryptedData = {}
    Object.keys(encryptedData).forEach(key => {
      var prop = encryptedData[key]
      if (this.protectedProps.includes(key)) {
        var buffer = Buffer.from(prop.data)
        prop = safeStorage.decryptString(buffer)
      }
      decryptedData[key] = prop
    })

    this.data = decryptedData
  }

  save() {
    if (!safeStorage.isEncryptionAvailable()) {
      return fs.writeFileSync(this.storagePath, JSON.stringify(data, 0, 3))
    }

    var encryptedData = {}
    Object.keys(this.data).forEach(key => {
      var prop = this.data[key]
      if (this.protectedProps.includes(key)) {
        prop = safeStorage.encryptString(prop)
      }
      encryptedData[key] = prop
    })

    fs.writeFileSync(this.storagePath, JSON.stringify(encryptedData, 0, 3))
  }

  get(key) {
    return this.data[key]
  }

  set(key, newData) {
    this.data[key] = newData
  }
}

module.exports = new Storage(['access_token', 'refresh_token'])
