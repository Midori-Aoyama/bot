const EventExtend = require('../EventExtend');



module.exports = class ReadyEvent extends EventExtend {

    get eventName() {
        return 'ready'
    }

    receive(client) {
  
    }
}