const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs') // Solve problems of node modules import
const nodeResolve = require('rollup-plugin-node-resolve') // Solve problems of node modules import
const eslint = require('rollup-plugin-eslint')
const colors = require('colors')
const showError = require('./showError')

module.exports = opts => {
    rollup.rollup({
        entry: opts.entry,
        plugins: [
            eslint({
                configFile: opts.eslint,
                exclude: ['node_modules/**', '**/Skylake.js']
            }),
            babel({
                babelrc: false,
                presets: [
                    ['es2015', { 'modules': false }]
                ],
                plugins: ['external-helpers']
            }),
            nodeResolve(),
            commonjs({
                include: ['node_modules/**', '**/Skylake.js']
            })
        ]
    }).then(bundle => {
        bundle.write({
            format: 'cjs',
            dest: opts.dest
        })
    }).then(() => {
        opts.callback()
    }).catch(error => {
        showError(error)
    })
}
