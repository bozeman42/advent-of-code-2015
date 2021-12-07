const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString().split('\n').map(package => package.split('x').map(x => parseInt(x))).map(package => package.sort((a, b) => a - b))

let part1 = input.reduce((total, package) => {
  const [l, w, h] = package
  return total += (3 * l * w + 2 * w * h + 2 * l * h)
}, 0)


let part2 = input.reduce((total, package) => {
  const [l, w, h] = package
  return total += 2* l + 2 * w + l * w * h
}, 0)
console.log(part1)
console.log(part2)