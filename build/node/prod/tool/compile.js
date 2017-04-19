const config = require('../config/config.js')
const rollup = require('../../common/tool/rollup.js')
const postcss = require('../../common/tool/postcss.js')

module.exports = callback => {
    postcss({
        entry: config.src + config.compiler.css.entry,
        dest: config.src + config.compiler.css.dest,
        autoprefixer: config.compiler.css.autoprefixer,
        callback: compileAppScript
    })

    function compileAppScript () {
        rollup({
            entry: config.src + config.compiler.js.entry,
            dest: config.src + config.compiler.js.dest,
            eslint: config.compiler.js.eslint,
            callback: callback
        })
    }
}
