const colors = require('colors')

module.exports = error => {
    console.log(colors.red('---------------------------------------------'))
    console.log(' ')
    console.log(colors.red(error))
    console.log(' ')
    console.log(colors.red('---------------------------------------------'))
}
