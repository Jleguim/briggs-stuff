const { BrowserWindow } = require('electron')

var mainWindow = null

function createMainWindow(options) {
  mainWindow = new BrowserWindow(options)
  return mainWindow
}

function changeMainWindowView(urlOrPath, isUrl = false) {
  if (isUrl) mainWindow.loadURL(urlOrPath)
  else mainWindow.loadFile(urlOrPath)
  return mainWindow
}

function getMainWindow() {
  return mainWindow
}

function createChildWindow(urlOrPath, isUrl = false, options) {
  var childWindow = new BrowserWindow({ parent: mainWindow, ...options })

  if (isUrl) childWindow.loadURL(urlOrPath)
  else childWindow.loadFile(urlOrPath)

  return childWindow
}

module.exports = {
  createMainWindow,
  changeMainWindowView,
  createChildWindow,
  getMainWindow
}
