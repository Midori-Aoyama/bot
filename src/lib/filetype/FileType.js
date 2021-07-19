


module.exports = class FileType {
    constructor(dirName, name, pathResolver) {
        this.dir = dirName
        this.dirWin = dirName.replace(/\//g, `\\`)
        this.dirLinux = dirName.replace(/\//g, '/')
        this.name = name.replace(/(\.[a-zA-Z0-9_]+)/g, '')
        this.prefix = name.replace(name, '')
        this.pathResolver = pathResolver
    }
}