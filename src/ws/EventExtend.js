const FileType = require('../lib/filetype/FileType')


module.exports = class EventExtend {
    constructor(file) {
        if (file instanceof FileType) {
            this.file = file
        }

    
    }


    /**
     * @description If you're building something, then disable it so it doesn't cause big explosions.
     */
    get disable() {
        return false
    }

    get name() {
        return ''
    }

    get eventName() {
        return ''
    }

    on() {}
    
    receive() {}
}