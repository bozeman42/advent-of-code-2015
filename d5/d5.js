const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString().split('\n')

const niceTest1 = /([aeiou]\w*){3,}/
const niceTest2 = /([a-z])\1/
const niceTest3 = /ab|cd|pq|xy/ 

function isNice(string) {
  return (
    niceTest1.test(string) &&
    niceTest2.test(string) &&
    !niceTest3.test(string)
  )
}

let result = input.filter(isNice)

console.log(result.length)

const niceTest4 = /([a-z][a-z])\w*\1/
const niceTest5 = /([a-z])\w\1/

function isNice2(string) {
  return (
    niceTest4.test(string) &&
    niceTest5.test(string)
  )
}

let resultp2 = input.filter(isNice2)

console.log(resultp2.length)