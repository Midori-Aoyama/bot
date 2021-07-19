const { readdirSync, lstat } = require('fs')
const path = require('path')
const EventExtend = require('../../ws/EventExtend')
const FileType = require('../filetype/FileType')
const ListenersManager = require('../listenersManager/ListenersManager')
const hound = require('hound')
const LoggerManager = require('../logger/LoggerManager')

module.exports = class LoadEvents {
    constructor() {
        /**
         * @description How about mapping all listeners to remove or control those event listeners. 
         */
        this.logger = new LoggerManager()
        this.listeners = new Map()
    }

    load(client) {

        // Hook
        const watch = hound.watch(path.resolve(__dirname + '../../../ws/events'))

        watch.on('change', (file, stats) => {
          
            try {
                this.logger.debug('', file)
                delete require.cache[require.resolve(path.resolve(file))]
              
                const filepath = new (require(file))()

                this.listeners.get(filepath.eventName).class.delete(filepath.name)
                if (filepath instanceof EventExtend) {    
                    if (filepath.disable == true) {
                        return
                    }
        
                    if (this.listeners.get(filepath.eventName) == null) {
                        if (this.listeners.get(filepath.eventName) == null) {
                 
                            this.listeners.set(filepath.eventName, new ListenersManager(filepath.eventName)
                                .addEvent(filepath)
                            )
                        }
                    } else {
                        if (this.listeners.get(filepath.eventName).class.get(filepath.name) == null) {
                 
                            this.listeners.get(filepath.eventName).addEvent(filepath)
                        } else {
            
                            this.listeners.get(filepath.eventName).class.delete(filepath.name)
                            this.listeners.get(filepath.eventName).addEvent(filepath)
                        }
                    }
                }
            } catch (error) {
                this.logger.error('[Watch] [Change]', error)
                this.logger.debug('[Watch] [Change]', JSON.stringify(stats))
                console.log(error)
            }
        })

        const load = (__path) => {
            readdirSync(__path).forEach(async (file) => {
   
                if (file.endsWith('.js')) {
                    const filepath = new (require(path.resolve(__path + '/' + file)))          
                    if (filepath instanceof EventExtend) {
      
                        filepath.file = await new FileType(path.resolve(__path), file, __path)
                        if (this.listeners.get(filepath.eventName) == null) {
                            this.listeners.set(filepath.eventName, new ListenersManager(filepath.eventName)
                                .addEvent(filepath)
                                .startEvent(client)
                            )
                        }    
                    } 
                } else {
                    load(__path + `/${file}`)
                }

            })
        }


        load(path.resolve(__dirname + '../../../ws/events') )

        return null
    }

    
}