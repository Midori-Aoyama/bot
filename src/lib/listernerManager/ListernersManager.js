const EventExtend = require('../../ws/EventExtend')

module.exports = class ListernersManager {
    constructor(eventName) {
        this.class = []
        this.event = eventName
    }


    addEvent(...event) {
        event.forEach((e) => {
            if (e instanceof EventExtend) {
                this.class.push(e)
            }
        })
        return this
    }
    
    startEvent(client) {
        client.on(this.event, (...args) => {
            this.class.forEach((event) => {
                event.receive(args)
            })
        })
        return
    }


}