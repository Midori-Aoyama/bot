const FileType = require('../lib/filetype/FileType')


module.exports = class EventExtend {
    constructor(file) {
        if (file instanceof FileType) {
            this.file = file
        }

    
    }

    get eventName() {
        return ''
    }

    receive(...args) {

    }
}