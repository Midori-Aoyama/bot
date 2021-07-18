const { Permission } = require('eris');
const CommandBlock = require('../../classes/command/CommandBlock');


module.exports = class PingCommand extends CommandBlock {

    constructor() {
        super({
            name: 'ping',
            description: '{{command-ping}}',
            development: false,
            slashCommand: true
        })
    }

    get aliases() {
        return ['pong']
    }

    get permissionsBot() {
        return ['send']
    }

    runCommand(ctx) {
        ctx.channel.createMessage(`Poooong!`)
    }


}