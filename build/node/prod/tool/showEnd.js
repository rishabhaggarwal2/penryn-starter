const colors = require('colors')

module.exports = type => {
    console.log(colors.magenta('→ ' + type + ' files are minified ❤ '))
}
