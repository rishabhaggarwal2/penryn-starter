const config = require('../config/config.js')
const fs = require('fs')
const colors = require('colors')

module.exports = robotsAllowed => {

    if (robotsAllowed === 'y') {
        allowRobots()
    }

    function allowRobots () {
        const file = config.dest + config.robots
        const content = fs.readFileSync(file, 'utf8')
        const replacement = content.replace('<meta name="robots" content="noindex, nofollow">', '<meta name="robots" content="all">')

        fs.writeFileSync(file, replacement, 'utf-8')
        callback()

        function callback () {
            console.log(colors.cyan('→ Robots are allowed ! '))
        }
    }
}
