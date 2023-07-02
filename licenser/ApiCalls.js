const superagent = require('superagent')

const APIURL = 'https://briggs-stuff.jleguim.repl.co/'

module.exports.validate = async function(key) {
	var endpoint = APIURL + 'licensing/validate/'
	var response = await superagent.get(endpoint).send({ key }).ok(() => true)

	if (response.status == 500) {
		console.error('error: %d', request.body)
		return
	}

	return response
}

module.exports.activate = async function(key) {
	var endpoint = APIURL + 'licensing/activate/'
	var response = await superagent.put(endpoint).send({ key }).ok(() => true)

	if (response.status == 500) {
		console.error('error: %d', request.body)
		return
	}

	return response
}
