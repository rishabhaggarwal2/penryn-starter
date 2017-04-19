const config = require('../config/config.js')
const fs = require('fs')
const fse = require('fs-extra')
const glob = require('glob')
const minify = require('html-minifier').minify
const showEnd = require('./showEnd.js')

module.exports = callback => {
    glob(config.src + config.minify.html.view + '**/*.php', false, (er, files) => {
        getMinify(files, 0)
    })

    function getMinify (files, no) {
        const file = files[no]
        const fileContent = fs.readFileSync(file, 'utf8')
        const fileContentMin = minify(fileContent, {
            collapseWhitespace: true,
            removeComments: true
        })
        const dest = config.dest + file.substring(config.src.length)

        fse.outputFileSync(dest, fileContentMin, 'utf-8')

        cleanPhpTags(dest)

        if (no === files.length - 1) {
            console.log('\n')
            showEnd('PHP')
            callback()
        } else {
            getMinify(files, no + 1)
        }
    }

    function cleanPhpTags (dest) {
        replaceInFile(dest, /> <\?=/g, '><?=')
        replaceInFile(dest, /> <\?php/g, '><?php')
        replaceInFile(dest, /\?> </g, '?><')
    }

    function replaceInFile (file, str, newStr) {
        const content = fs.readFileSync(file, 'utf8')
        const replacement = content.replace(str, newStr)
        fs.writeFileSync(file, replacement, 'utf-8')
    }
}
