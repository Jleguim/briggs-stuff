async function main() {
  var params = new URL(window.location).searchParams
  var uri = window.location.href.slice(0, -window.location.search.length) // location.href w/o params
  var code = params.get('code')
  var servicePath =
    window.location.pathname == '/auth/discord'
      ? 'discord'
      : window.location.pathname == '/auth/twitch'
      ? 'twitch'
      : undefined

  if (!code || !servicePath) return window.open('/', '_self')

  var response = await fetch(`${document.api}/auth/${servicePath}?code=${code}&uri=${uri}`)
  var token = await response.text()

  var cookie = `jwt=${token};path=/;max-age=${60 * 60 * 24 * 3}`
  document.cookie = cookie

  window.open('/dashboard', '_self')
}

main()
