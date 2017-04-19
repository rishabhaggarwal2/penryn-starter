const config = require('../config/config.js')
const fs = require('fs')
const fse = require('fs-extra')
const colors = require('colors')

module.exports = () => {
    for (let i = 0; i < config.copy.length; i++) {
        fileCopier(config.copy[i], i)
    }

    function fileCopier (src, i) {
        if (fileExists(config.src + src)) {
            fse.copySync(config.src + src, config.dest + src)
        }

        if (i === config.copy.length - 1) {
            console.log(colors.magenta('→ All files are copied   ❤ '))
        }
    }

    function fileExists (filePath) {
        try {
            return fs.lstatSync(filePath)
        } catch (err) {
            return false
        }
    }
}
