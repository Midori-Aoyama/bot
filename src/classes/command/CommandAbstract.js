

module.exports = class CommandAbstract {
    constructor(message, client) {
        this.message = message
        this.client = client
    }

    get channel() {
        return this.message.channel
    }

    get member() {
        return this.message.member
    }

}