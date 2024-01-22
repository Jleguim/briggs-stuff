async function main() {
  let jwt = document.cookies['jwt']
  if (!jwt) return window.open('/', '_self')

  let calls = ['/api/discord/me', '/api/twitch/me']
  for (const callPath of calls) {
    let res = await fetch(document.api + callPath, { headers: { jwt } })
    if (res.status == '401') return promptForRelogin()

    var body = await res.json()
    document.write(JSON.stringify(body, 0, 3))
  }
}

function promptForRelogin() {
  document.cookie = 'jwt=;path=/;maxAge=0;'
  return window.open('/', '_self')
}

main()
