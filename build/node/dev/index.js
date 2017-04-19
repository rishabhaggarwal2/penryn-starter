const config = require('./config/config.js')
const ip = require('./config/ip.js')
const browserSync = require('browser-sync').create()
const rollup = require('../common/tool/rollup.js')
const postcss = require('../common/tool/postcss.js')

compileJs()
compileCss()

const isWindows = /^win/.test(process.platform)
const browserSyncConfig = {
    win: {
        open: 'external',
        host: ip,
        proxy: ip,
        port: 3000,
        notify: false
    },
    mac: {
        open: 'external',
        proxy: 'http://localhost/',
        port: 3000,
        notify: false
    }
}
const browserSyncConfigObj = isWindows ? browserSyncConfig.win : browserSyncConfig.mac

browserSync.init(browserSyncConfigObj)

browserSync.watch(config.php.watch).on('change', browserSync.reload)
browserSync.watch(config.js.watch).on('change', compileJs)
browserSync.watch(config.css.watch).on('change', compileCss)

function compileJs () {
    rollup({
        entry: config.js.entry,
        dest: config.js.dest,
        eslint: config.js.eslint,
        callback: reloadJs
    })
}

function compileCss () {
    postcss({
        entry: config.css.entry,
        dest: config.css.dest,
        autoprefixer: config.css.autoprefixer,
        callback: reloadCss
    })
}

function reloadJs () {
    browserSync.reload(config.js.dest)
}

function reloadCss () {
    browserSync.reload(config.css.dest)
}
