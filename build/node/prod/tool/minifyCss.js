const config = require('../config/config.js')
const fs = require('fs')
const fse = require('fs-extra')
const cssnano = require('cssnano')
const writeInternal = require('./writeInternal.js')
const showEnd = require('./showEnd.js')

module.exports = internal => {
    const css = fs.readFileSync(config.src + config.minify.css, 'utf8')

    cssnano.process(css).then(result => {
        if (internal === 'y') {
            writeInternal({
                content: result.css,
                type: css,
                callback: callback
            })
        } else {
            fse.outputFileSync(config.dest + config.minify.css, result.css, 'utf-8')
            callback()
        }
    })

    function callback () {
        showEnd('CSS')
    }
}
