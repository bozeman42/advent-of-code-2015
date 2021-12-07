const crypto = require('crypto')

const input = 'ckczppom'

let md5 = crypto.createHash('md5')

md5.update(input)

console.log(md5.digest('hex').substr(0,5))

let nonce = 1
md5 = crypto.createHash('md5')
md5.update(`${input}${nonce}`)
while (md5.digest('hex').substr(0,6) !== '000000') {
  nonce += 1
  md5 = crypto.createHash('md5')
  md5.update(`${input}${nonce}`)
}

console.log(nonce)