const config = require('../config/config.js')
const fs = require('fs')
const fse = require('fs-extra')
const uglifyJS = require('uglify-js')
const writeInternal = require('./writeInternal.js')
const showEnd = require('./showEnd.js')

module.exports = internal => {
    // Add all files from main.js
    const js = fs.readFileSync(config.src + config.minify.js, 'utf8')
    const result = uglifyJS.minify(js).code
    const closure = {
        start: '(function(){',
        end: '})();'
    }

    // Add additional scripts
    let additionalScript
    const additionalScriptL = config.additionalScript.length
    if (additionalScriptL > 0) {
        for (let i = 0; i < additionalScriptL; i++) {
            additionalScript = fs.readFileSync(config.src + config.additionalScript[i], 'utf8')
            removeAdditionalScriptTags(i)
        }
    } else {
        additionalScript = ''
        getFullResult()
    }

    function removeAdditionalScriptTags (no) {
        const replacement = ''
        const toReplace = '<script type="text/javascript" src="/' + config.additionalScript[no] + '"></script>'

        function removeScriptTag (i) {
            const file = config.dest + config.internal[i]
            const currentContent = fs.readFileSync(file, 'utf8')
            const newContent = currentContent.replace(toReplace, replacement)

            fs.writeFileSync(file, newContent, 'utf-8')

            if (i === config.internal.length - 1) {
                getFullResult()
            } else {
                removeScriptTag(i + 1)
            }
        }

        removeScriptTag(0)
    }

    function getFullResult () {
        // Grouping
        const fullResult = closure.start + additionalScript + result + closure.end

        if (internal === 'y') {
            writeInternal({
                content: fullResult,
                type: 'js',
                callback: callback
            })
        } else {
            fse.outputFileSync(config.dest + config.minify.js, fullResult, 'utf-8')
            callback()
        }
    }

    function callback () {
        showEnd('JS ')
    }
}
