const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString().split('').map(direction => {
  switch (direction) {
    case '^':
      return [0, 1]
      break
    case '>':
      return [1, 0]
      break
    case '<':
      return [-1, 0]
    case 'v':
      return [0, -1]
    default:
      throw new Error('Fuck!')
  }
})

let position = [0,0]
let visitedHouses = {'0:0': 1}

input.forEach(direction =>  {
  let [x0, y0] = position
  let [x, y] = direction
  position = [x0 + x, y0 + y]
  const positionString = `${position[0]}:${position[1]}`
  if (visitedHouses[positionString] === undefined) visitedHouses[positionString] = 0
  visitedHouses[positionString] += 1
})

console.log(Object.keys(visitedHouses).length)
position = [0, 0]
let roboPosition = [0, 0]
visitedHouses = {'0:0': 2}

const setPosition = (position, direction) => {
  let [x0, y0] = position
  let [x, y] = direction
  return [x0 + x, y0 + y]
}

input.forEach((direction, index) =>  {
  let visitedPosition = null
  if (index % 2) {
    position = setPosition(position, direction)
    visitedPosition = position
  } else {
    roboPosition = setPosition(roboPosition, direction)
    visitedPosition = roboPosition
  }
  const positionString = `${visitedPosition[0]}:${visitedPosition[1]}`
  if (visitedHouses[positionString] === undefined) visitedHouses[positionString] = 0
  visitedHouses[positionString] += 1
})

console.log(Object.keys(visitedHouses).length)