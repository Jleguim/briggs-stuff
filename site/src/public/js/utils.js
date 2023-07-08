function getCookies() {
  var cookieEntries = document.cookie.split('; ').map(v => v.split('='))
  var cookieObject = Object.fromEntries(cookieEntries)
  return cookieObject
}

document.api = 'http://localhost:1337'
document.cookies = getCookies()
