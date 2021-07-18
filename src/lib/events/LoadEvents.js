const { readdirSync } = require('fs')


module.exports = class LoadEvents {
    load() {
        readdirSync(__dirname + '')
    }
}