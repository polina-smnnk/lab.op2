import { log } from './decorator.js'
import { logger } from './logger.js'

logger.setTargets(['console', 'file', 'service'])

logger.setFormatter((data) => {
    return `${data.level} -> ${data.name} -> ${data.execution}ms`
})

const multiply = log('INFO')(function multiplyNumbers(a, b) {
    return a * b
})

const randomNumbers = log('DEBUG')(async function generateList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10)
            ])
        }, 300)
    })
})

const brokenFunction = log('ERROR')(function crash() {
    throw new Error('System failure')
})

multiply(5, 9).then((res) => {
    console.log(res)
})

randomNumbers().then((res) => {
    console.log(res)
})

brokenFunction().catch(() => {
    console.log('program continues')
})