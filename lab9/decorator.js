import { logger } from './logger.js'

export function log(level = 'INFO') {
    return function (fn) {
        return async function (...args) {
            const start = Date.now()

            try {
                const result = await fn(...args)

                if (level !== 'ERROR') {
                    logger.save({
                        level,
                        name: fn.name,
                        args,
                        result,
                        time: new Date().toLocaleString(),
                        execution: Date.now() - start
                    })
                }

                return result
            } catch (err) {
                logger.save({
                    level: 'ERROR',
                    name: fn.name,
                    args,
                    result: err.message,
                    time: new Date().toLocaleString(),
                    execution: Date.now() - start
                })

                throw err
            }
        }
    }
}