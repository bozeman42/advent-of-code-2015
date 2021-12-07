const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString().split('')

let floor = 0
let position = 1
input.forEach(instruction => {
  floor += instruction === '(' ? 1 : -1
  if (floor === -1) console.log(position)
  position++
})

console.log(floor)