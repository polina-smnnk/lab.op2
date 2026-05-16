import { log } from './decorator.js'
import { logger } from './logger.js'

logger.setTargets(['console', 'file'])

const sum = log('INFO')(function add(a, b) {
    return a + b
})

const divide = log('ERROR')(function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error('Division by zero')
    }

    return a / b
})

const asyncTask = log('DEBUG')(async function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                role: 'student'
            })
        }, 500)
    })
})

sum(4, 8).then((res) => {
    console.log(res)
})

asyncTask(12).then((data) => {
    console.log(data)
})

divide(10, 0).catch(() => {
    console.log('error handled')
})