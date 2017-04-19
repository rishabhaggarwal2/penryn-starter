const fs = require('fs')
const config = require('../config/config.js')

module.exports = callback => {
    const unlink = config.page.delete
    const unlinkL = unlink.length

    getUnlink(0)

    function getUnlink (i) {
        if (i === unlinkL) {
            callback()
        } else {
            fs.unlinkSync(unlink[i])
            getUnlink(i + 1)
        }
    }
}
