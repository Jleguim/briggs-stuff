var jwt = document.cookies['jwt']
if (!jwt) return window.open('/', '_self')
