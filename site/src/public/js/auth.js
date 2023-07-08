async function main () {
  var params = new URL(window.location).searchParams
  var code = params.get('code')
  if (!code) return window.open('/', '_self')

  var uri = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  var response = await fetch(`${document.api}/discord/auth?code=${code}&uri=${uri}`)
  var token = await response.text()

  var cookie = `briggs=${token};path=/;max-age=${60 * 60 * 24 * 3}`
  document.cookie = cookie

  window.open('/dashboard', '_self')
}

main()
