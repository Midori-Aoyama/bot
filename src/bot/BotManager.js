const { Client } = require('eris');

/**
 * @name dotenv
 * @package https://www.npmjs.com/package/dotenv
 */
require('dotenv').config()



/**
 * @name Eris
 * @package https://github.com/RabbitHouseCorp/eris/tree/feature/interaction
 */
module.exports = class BotManager extends Client {
    constructor() {
        super(process.env.TOKEN, {

        })

        

        this.connect()
    }
}