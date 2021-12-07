const fs = require('fs')
const path = require('path')

function uint16(n) {
  return n & 0xFFFF
}

const OPERATIONS = {
  NOT:  x => uint16(~x),
  OR: (x, y) => uint16(x | y),
  LSHIFT: (x, y) => uint16(x << y),
  RSHIFT:  (x, y) => uint16(x >> y),
  AND: (x, y) => uint16( x & y),
  SIGNAL:  x => uint16(x)
}

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString()
  .split('\n')
  .reduce((result, line) => {
    const [expression, functionName] = line.split(' -> ')
    const [ operation ] = expression.match(/NOT|OR|LSHIFT|RSHIFT|AND/g) ?? ['SIGNAL']
    if (operation === 'SIGNAL') {
      return {
        ...result,
        [functionName]: {
          operands: [expression],
          operation: OPERATIONS.SIGNAL,
          value: null
        }
      }
    } else if (operation === 'NOT') {
      const [_, operand] = expression.split('NOT ')
      return {
        ...result,
        [functionName]: {
          operands: [operand],
          operation: OPERATIONS.NOT,
          value: null
        }
      }
    } else {
      const operands = expression.split(` ${operation} `)
      return {
        ...result,
        [functionName]: {
          operands,
          operation: OPERATIONS[operation],
          value: null
        }
      }
    }
  }, {})

let depth = 0
// part 2. remove next line to get part 1
input.b.value = 3176
function execute(fn) {
  if (typeof (input[fn].value) === 'number') return input[fn].value
  const operandSymbols = input[fn].operands.map(x => {
    if (!isNaN(parseInt(x))) return parseInt(x)
    if (typeof input[x].value === 'number') return input[x].value
    return x
  })
  if (operandSymbols.every(x => typeof x === 'number')) input[fn].value = input[fn].operation(...operandSymbols)
  const operands = operandSymbols.map(operand => {
    if (typeof operand === 'string') {
      if (typeof input[operand].value === 'number') return input[operand].value
      return execute(operand)
    } else {
      return operand
    }
  })
  return input[fn].operation(...operands)
}
console.time('Execute a')
console.log(execute('a'))
console.timeEnd('Execute a')