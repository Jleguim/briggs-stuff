async function main() {
  var jwt = document.cookies['briggs']
  if (!jwt) return window.open('/', '_self')

  var url = `${document.api}/test/api/identify`
  var options = { headers: { briggs: jwt } }
  var response = await fetch(url, options)
  var body = await response.json()

  document.write(JSON.stringify(body, 0, 3))
}

main()
