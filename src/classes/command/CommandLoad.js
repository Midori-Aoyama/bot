const CommandBlock = require('./CommandBlock')
const { readdirSync, lstat } = require('fs')
const path = require('path')
const hound = require('hound')
const LoggerManager = require('../../lib/logger/LoggerManager')


module.exports = class CommandLoad {
    constructor() {
        this.commands = new Map()
        this.logger = new LoggerManager()
    }


    load() {
           // Hook
           const watch = hound.watch(path.resolve(__dirname + '../../../commands/'))

           watch.on('change', (file, stats) => {
             
               try {
                   this.logger.debug('[Watch] [CommandLoad] [Command-Updated]', file)
                   delete require.cache[require.resolve(path.resolve(file))]
                 
                   const filepath = new (require(file))()
   

                   if (filepath instanceof CommandBlock) {    
                        this.commands.delete(filepath.name)
                        this.commands.set(filepath.name, filepath)
                   }
               } catch (error) {
                   this.logger.error('[Watch] [CommandLoad] [Command-Updated]', error)
                   this.logger.debug('[Watch] [CommandLoad] [Command-Updated]', JSON.stringify(stats))
                   console.log(error)
               }
           })
   
           const load = (__path) => {
               readdirSync(__path).forEach(async (file) => {
      
                   if (file.endsWith('.js')) {
                       const filepath = new (require(path.resolve(__path + '/' + file)))          
                       if (filepath instanceof CommandBlock) {
                            this.commands.set(filepath.name, filepath)
                       } 
                   } else {
                       load(__path + `/${file}`)
                   }
   
               })
           }

            load(path.resolve(__dirname + '../../../commands') )
        return this
    }

    
}