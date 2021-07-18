

module.exports = class CommandBlock {

    constructor(command) {
        this.name = command.name
        this.description = command.description
        this.development = command.development
        this.slashCommand = command.slashCommand     
    }

    get aliases() {
        return []
    }

    get permissionsUser() {
        return []
    }

    get permissionsBot() {
        return []
    }

    runCommand(ctx, bot)

}