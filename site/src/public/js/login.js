const loginBtn = document.getElementById('loginBtn')

if (document.cookies['briggs']) {
  window.open('/dashboard', '_self')
}

function openOAuthWindow() {
  var uri = `${window.location.origin}/auth`
  var url = `${document.api}/discord/redirect?uri=${encodeURI(uri)}`

  var options = 'location=yes,height=570,width=520,scrollbars=yes,status=yes'
  window.open(url, '_self', options)
}

loginBtn.addEventListener('click', openOAuthWindow)
