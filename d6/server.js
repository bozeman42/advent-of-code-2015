const express = require('express')

const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString()
const data = input.split('\n')
  .map(line => {
    const coordinatesRegex = /\d+,\d+/g
    const instructionRegex = /on|off|toggle/
    const coordinates = line.match(coordinatesRegex).map(coordinate => coordinate.split(',').map(x => parseInt(x)))
    const [ instruction ] = line.match(instructionRegex)
    const [p1, p2] = coordinates
    return {
      instruction,
      p1: p1.map(x => parseInt(x)),
      p2: p2.map(x => parseInt(x))
    }
  })


const app = express()

app.get('/data', (req, res) => res.send(data))

app.use(express.static('public'))

app.listen(5000, () => console.log('listening on http://localhost:5000'))