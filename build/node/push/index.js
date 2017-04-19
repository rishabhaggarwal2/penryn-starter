const fs = require('fs')
const PackageFile = 'package.json'
const PackageJson = require('../../../' + PackageFile)
const Readline = require('readline')
const colors = require('colors')

// Get package.json version
const q = colors.blue('CURRENT VERSION : ' + PackageJson.version + '\r\n') + colors.yellow('NEW VERSION ?\r\n\r\n')
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question(q, (version) => {
    const futureVersion = isInt(version.charAt(0)) ? version : PackageJson.version
    updatePackage(futureVersion)
    rl.close()
})

function isInt(value) {
    if (isNaN(value)) {
        return false
    }
    const x = parseFloat(value)
    return (x | 0) === x
}

function updatePackage (version) {
    PackageJson.version = version

    fs.writeFile(PackageFile, JSON.stringify(PackageJson, null, 4), function (err) {
        if (err) {
            console.log(err)
        }
    })
}
