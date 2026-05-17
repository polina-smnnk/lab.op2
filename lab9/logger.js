import fs from 'fs'

class LoggerSystem {
    constructor() {
        this.targets = ['console']
        this.formatter = this.defaultFormatter
        this.onlyErrors = false
    }

    setTargets(list) {
        this.targets = list
    }

    setFormatter(fn) {
        this.formatter = fn
    }

    enableErrorMode() {
        this.onlyErrors = true
    }

    defaultFormatter(data) {
        return JSON.stringify({
            time: data.time,
            level: data.level,
            functionName: data.name,
            arguments: data.args,
            result: data.result,
            executionTime: data.execution + 'ms'
        })
    }

    save(data) {
        if (this.onlyErrors && data.level !== 'ERROR') {
            return
        }

        const text = this.formatter(data)

        if (this.targets.includes('console')) {
            console.log(text)
        }

        if (this.targets.includes('file')) {
            fs.appendFileSync('logs.txt', text + '\n')
        }

        if (this.targets.includes('service')) {
            fs.appendFileSync('service.txt', text + '\n')
        }
    }
}

export const logger = new LoggerSystem()