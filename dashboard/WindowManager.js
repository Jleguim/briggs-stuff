const { BrowserWindow, BrowserView } = require('electron')

class WindowManager {
  constructor() {
    this.mainWindow = null
  }

  createMainWindow(options) {
    this.mainWindow = new BrowserWindow(options)
    return this.mainWindow
  }

  changeMainWindowView(urlOrPath, isUrl = false) {
    if (isUrl) this.mainWindow.loadURL(urlOrPath)
    else this.mainWindow.loadFile(urlOrPath)
    return this.mainWindow
  }

  createChildWindow(urlOrPath, isUrl = false, options) {
    var childWindow = new BrowserWindow({ parent: this.mainWindow, ...options })
    if (isUrl) childWindow.loadURL(urlOrPath)
    else childWindow.loadFile(urlOrPath)
    return childWindow
  }

  createBrowserView(
    urlOrPath,
    isUrl = false,
    bounds = { x: 0, y: 0, width: 300, height: 300 },
    options = {}
  ) {
    var browserView = new BrowserView(options)
    mainWindow.setBrowserView(browserView)
    browserView.setBounds(bounds)

    if (isUrl) browserView.webContents.loadURL(urlOrPath)
    else browserView.webContents.loadFile(urlOrPath)

    return browserView
  }
}

module.exports = new WindowManager()
