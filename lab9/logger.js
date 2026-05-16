import fs from 'fs'

class LoggerSystem {
    constructor() {
        this.targets = ['console']
        this.formatter = this.defaultFormatter
    }

    setTargets(list) {
        this.targets = list
    }

    setFormatter(fn) {
        this.formatter = fn
    }

    defaultFormatter(data) {
        return `[${data.time}] ${data.level} ${data.name} | args: ${JSON.stringify(data.args)} | result: ${JSON.stringify(data.result)}`
    }

    save(data) {
        const text = this.formatter(data)

        if (this.targets.includes('console')) {
            console.log(text)
        }

        if (this.targets.includes('file')) {
            fs.appendFileSync('logs.txt', text + '\n')
        }
    }
}

export const logger = new LoggerSystem()