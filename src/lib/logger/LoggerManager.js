

module.exports = class LoggerManager {
    log(type, message) {
        console.log(`[${new Date().toGMTString()}] [LOG] ${type} ${message}`)
    }

    warn(type, message) {
        console.warn(`[${new Date().toGMTString()}] [WARN] ${type} ${message}`)
    }
    
    debug(type, message) {
        if (process.env.DEBUG) {
            console.debug(`[${new Date().toGMTString()}] [DEBUG] ${type} ${message}`)
        }
    }

    error(type, message) {
        console.error(`[${new Date().toGMTString()}] [ERROR] ${type} ${message}`)
    }
}