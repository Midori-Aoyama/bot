const { readdirSync } = require('fs')
const path = require('path')
const EventExtend = require('../../ws/EventExtend')
const FileType = require('../filetype/FileType')
const ListernersManager = require('../listernerManager/ListernersManager')


module.exports = class LoadEvents {
    constructor() {
        /**
         * @description How about mapping all listeners to remove or control those event listeners. 
         */
        this.listerners = new Map()
    }

    async load(client) {
        readdirSync(path.resolve(__dirname + '../../../ws/events')).forEach(async (file) => {
            const filepath = new (require(path.resolve(__dirname + '../../../ws/events/' + file)))          


            if (filepath instanceof EventExtend) {
                filepath.file = await new FileType(path.resolve(__dirname + '../../../ws/events'), file)
                if (this.listerners.get(filepath.eventName) == null) {
                    this.listerners.set(filepath.eventName, new ListernersManager(filepath.eventName)
                    .addEvent(filepath)
                    .startEvent(client)
                    )
                }    
            } 
        
        })
        return null
    }
}