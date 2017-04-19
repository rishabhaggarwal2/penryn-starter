const readline = require('readline')
const colors = require('colors')
const compile = require('./tool/compile.js')
const minifyHtml = require('./tool/minifyHtml.js')
const robots = require('./tool/robots.js')
const minifyCss = require('./tool/minifyCss.js')
const minifyJs = require('./tool/minifyJs.js')
const copy = require('./tool/copy.js')

const q = [
    colors.yellow('\nROBOTS ALLOWED ?\n\n'),
    colors.yellow('\nINTERNAL CSS ?\n\n'),
    colors.yellow('\nINTERNAL JS ?\n\n')
]
const r  = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function getQuestion (i) {
    rl.question(q[i], response => {
        r.push(response)
        if(i === q.length - 1) {
            rl.close()
            runCompile()
        } else {
            getQuestion(i + 1)
        }
    })
}

function runCompile () {
    compile(runMinifyHtml)
}

function runMinifyHtml () {
    minifyHtml(afterPhpMinifier)
}

function afterPhpMinifier () {
    robots(r[0])
    minifyCss(r[1])
    minifyJs(r[2])
    copy()
}

getQuestion(0)
