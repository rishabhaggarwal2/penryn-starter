const fs = require('fs')
const postcss = require('postcss')
const easyImport = require('postcss-easy-import')
const mixins = require('postcss-mixins')
const nested = require('postcss-nested')
const simpleVars = require('postcss-simple-vars')
const autoprefixer = require('autoprefixer')
const minmax = require('postcss-media-minmax')
const mqpacker = require('css-mqpacker')
const showError = require('./showError')

module.exports = opts => {
    const css = fs.readFileSync(opts.entry, 'utf8')

    postcss([
        easyImport({
            partial: false,
            extensions: ['.css'],
            glob: true
        }),
        mixins,
        simpleVars,
        nested,
        autoprefixer({browsers: opts.autoprefixer}),
        minmax,
        mqpacker
    ]).process(css, {
        from: opts.entry
    }).then(result => {
        fs.writeFileSync(opts.dest, result.css)
    }).then(() => {
        opts.callback()
    }).catch(error => {
        showError(error)
    })
}
