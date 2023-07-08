async function main() {
  var jwt = document.cookies['briggs']
	if (!jwt) return window.open('/', '_self')
	
  var response = await fetch(`${document.api}/test`, {
    headers: {
      briggs: jwt
    }
  })

  console.log(await response.text())
}

main()
