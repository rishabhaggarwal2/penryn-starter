const config = require('../config/config.js')
const fs = require('fs')

module.exports = opts => {
    const replacement = opts.type === 'js' ? '<script>' + opts.content + '</script>' : '<style>' + opts.content + '</style>'
    const toReplace = opts.type === 'js' ? '<script type="text/javascript" src="/' + config.minify.js + '"></script>' : '<link rel="stylesheet" href="/' + config.minify.css + '">'

    function writeInternal (i) {
        const file = config.dest + config.internal[i]
        const currentContent = fs.readFileSync(file, 'utf8')
        const newContent = currentContent.replace(toReplace, _ => { return replacement }) // Function as second parameter for escape $& replace pattern

        fs.writeFileSync(file, newContent, 'utf-8')

        if (i === config.internal.length - 1) {
            opts.callback()
        } else {
            writeInternal(i + 1)
        }
    }

    writeInternal(0)
}
