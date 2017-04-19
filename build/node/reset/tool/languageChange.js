const config = require('../config/config.js')
const fs = require('fs')

module.exports = callback => {
    const files = config.language
    const filesL = files.length

    for (let i = 0; i < filesL; i++) {
        getReplacement(i)
    }

    function getReplacement (i) {
        const content = fs.readFileSync(files[i], 'utf8')
        const replacement = content.replace(/lang="[a-z]+"/g, 'lang="en"')
        fs.writeFileSync(files[i], replacement, 'utf-8')

        if (i === filesL - 1) {
            callback()
        }
    }
}
