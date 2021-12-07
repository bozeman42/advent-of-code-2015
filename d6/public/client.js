const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

document.body.appendChild(canvas)


let lights = []

for (let i = 0; i < 1000; i++) {
  lights[i] = []
  for(let j = 0; j < 1000; j++) {
    lights[i][j] = 0
  }
}


fetch('/data')
  .then(response => response.json())
  .then(data => {
    let lightStates = []
    let counter = 0
    data.forEach(instructionSet => {
      lights = updateLightState(lights)(instructionSet)
      lightStates.push(renderLightStates(lights.flat(), ctx))
      console.log(counter++)
    })
    requestAnimationFrame(renderStates(lightStates, ctx))
    // const renderedStates = renderLightStates(lightStates, ctx)
    
    // let i = 0
    // const token = setInterval(() => {
    //   if (data[i + 1] === undefined) clearInterval(token)
    //   lights = updateLightState(lights)(data[i])
    //   drawLights(lights, ctx)
    //   i++
    // }, 1000)
    // drawLights(lights, ctx)
  })

function renderLightStates(lightState, ctx) {
  let imageData = ctx.getImageData(0,0,1000,1000)
  lightState.forEach((light, indexover4) => {
    const index = indexover4 * 4
    imageData.data[index] = light
    imageData.data[index + 1] = light
    imageData.data[index + 2] = light
    imageData.data[index + 3] = 256
  })
  ctx.putImageData(imageData, 0, 0)
  return imageData
}


function drawLights(lights, ctx) {
  let total = 0
  const flatLights = lights.flat()
  const imageData = ctx.getImageData(0,0,1000,1000)
  flatLights.forEach((light, indexover4) => {
    const index = indexover4 * 4
    imageData.data[index] = indexover4 % 3 === 0 ? (light - imageData.data[index]) * 3 : light
    imageData.data[index + 1] = indexover4 % 3 === 1 ? (light - imageData.data[index + 1]) * 3 : light
    imageData.data[index + 2] = indexover4 % 3 === 2 ? (light - imageData.data[index + 2]) * 3 : light
    imageData.data[index + 3] = 256
  })
  console.log(flatLights, imageData.data)
}

function updateLightState(lights) {
  return instructionSet => {
    let newLights = JSON.parse(JSON.stringify(lights))
    const { p1: [x1, y1], p2: [x2, y2], instruction } = instructionSet
    let x = Math.min(x1, x2)
    let y = Math.min(y1, y2)
    let xEnd = Math.max(x1, x2)
    let yEnd = Math.max(y1, y2)
    for (let i = y; i <= yEnd; i++) {
      for (let j = x; j <= xEnd; j++) {
        if (instruction === 'toggle') {
          newLights[i][j] += 2
        } else {
          newLights[i][j] += instruction === 'on' ? 1 : (newLights[i][j] > 0 ? -1 : 0)
        }
      }
    }
    return newLights
  }
}
let i = 0
function renderStates(imageDataArray, ctx) {
  console.log(imageDataArray)
  return function render(time) {
    ctx.putImageData(imageDataArray[i], 0, 0)
    i = i < 299 ? i + 1 : 0
    requestAnimationFrame(render)
  }
}
