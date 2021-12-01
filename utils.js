const https = require('https')

const httpRequest = reqOptions => {
  return new Promise((resolve, reject) => {
    options = {
      host: reqOptions.host,
      path: `/api${reqOptions.path}`,
      port: 443,
      method: 'GET',
      headers: {
        'Crypto-Pay-API-Token': reqOptions.token
      }
    }
    if (reqOptions.query) {
      options.path = `${options.path}?${reqOptions.query}`
    }
    console.log(options)
    const req = https.request(options, res => {
      console.log(options)
      // API don't return json res if URI string is more then webserver limit
      if (res.statusCode === 414) {
        reject(new Error('statusCode=' + res.statusCode + ' URI Too Large'))
      }
      let body = ''
      res.on('data', function (chunk) {
        body += chunk
      })
      res.on('end', function () {
        try {
          body = JSON.parse(body)
        } catch (e) {
          reject(new Error(e))
        }
        resolve(body)
      })
    })
    req.on('error', e => {
      reject(new Error(e))
    })
    req.end()
  })
}

const queryEncode = query => {
  if (!query) return
  let encodedQuery = ''
  for (const param in query) {
    encodedQuery += `${param}=${encodeURI(query[param])}&`
  }
  return encodedQuery
}

module.exports = { httpRequest, queryEncode }
