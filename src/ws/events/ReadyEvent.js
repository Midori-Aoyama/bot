const LoggerManager = require('../../lib/logger/LoggerManager');
const EventExtend = require('../EventExtend');



module.exports = class ReadyEvent extends EventExtend {


    get name() {
        return 'ready'
    }

    get eventName() {
        return 'ready'
    }

    receive(client) {
       new LoggerManager().log(`[Ready WS]`, `I'm ready.`)
    }
}