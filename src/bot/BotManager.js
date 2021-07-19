const { Client } = require('eris');
const CommandLoad = require('../classes/command/CommandLoad');
const LoadEvents = require('../lib/events/LoadEvents');

/**
 * @name dotenv
 * @package https://www.npmjs.com/package/dotenv
 */
require('dotenv').config()



/**
 * @name Eris
 * @package https://github.com/RabbitHouseCorp/eris/tree/feature/interaction
 */
class BotManager extends Client {
    constructor() {
        
        super(process.env.TOKEN, {
            autoreconnect: true,
            defaultImageFormat: 'png',
            defaultImageSize: 2048,
            restMode: true,
            allowedMentions: {
              everyone: false,
              roles: false,
              users: true,
              repliedUser: true
            },
            intents: process.env.INTENTS
        })
        
        this.loadEvent = new LoadEvents().load(this)
        this.commandManager = new CommandLoad().load()


    }
}

new BotManager().connect()
