const EventExtend = require('../../ws/EventExtend')
const hound = require('hound')
const LoggerManager = require('../logger/LoggerManager')


module.exports = class ListenersManager {
    constructor(eventName) {
        this.class = new Map()
        this.event = eventName
        this.started = false
        this.logger = new LoggerManager()
        
    }


    addEvent(...event) {
        event.forEach((e) => {
            if (e instanceof EventExtend) {
                this.class.set(e.name, e)
            }
        })
        return this
    }
    
    startEvent(client) {
        this.started = true
        if (this.started) {
            client.on(this.event, (...args) => {
                this.class.forEach((event) => {
                    try {
                        event.receive(client, ...args)
                    } catch(error) {
                        this.logger.error(`[Event-Manager] [${this.event}(${event.name})]`, `${error}`)
                        console.log(error)
                    }
                })
            })
        }

        return this
    }


}