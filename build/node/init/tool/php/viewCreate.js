const fs = require('fs')
const config = require('../../config/config.js')

module.exports = page => {
    for (let i = 0; i < page.qty; i++) {
        createPhpView(i)
    }

    function createPhpView (i) {
        const phpViewDest = config.page.php.view + page.url[i] + '.php'

        var stream = fs.createWriteStream(phpViewDest)
        stream.once('open', _ => {
            stream.write( '<div id="' + page.id[i] + '">\r\n\r\n')
            stream.write('</div>\r\n')
            stream.end()
        })
    }
}
