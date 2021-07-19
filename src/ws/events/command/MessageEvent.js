const CommandAbstract = require('../../../classes/command/CommandAbstract');
const EventExtend = require('../../EventExtend');



module.exports = class MessageEvent extends EventExtend {
    get name() {
        return 'commandBlock'
    }

    get eventName() {
        return 'messageCreate'
    }

    receive(client, message) {

        let content = message.content.toLocaleLowerCase()

        if (!content.startsWith(process.env.PREFIX)) {
            return
        }


        if (message.member.user.bot || message.member.user.system) {
            return
        }

        let getCommand = content.substr(process.env.PREFIX.length + 1).split(' ')
        
        const command = client.commandManager.commands.get(getCommand[0])

        if (!(command == null)) {
            command.runCommand(new CommandAbstract(message, client), null)
        }
    
    }
}