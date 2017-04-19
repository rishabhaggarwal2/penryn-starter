const fs = require('fs')
const config = require('../../config/config.js')

module.exports = _ => {
    const folder = config.php.view

    fs.readdir(folder, (err, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i] !== 'home.php') {
                getUnlink(files[i])
            }
            if (i === files.length - 1) {
                createAboutView()
            }
        }
    })

    function getUnlink (file) {
        fs.unlink(folder + file)
    }

    function createAboutView () {
        const phpViewDest = folder + 'about.php'

        var stream = fs.createWriteStream(phpViewDest)
        stream.once('open', _ => {
            stream.write( '<div id="a">\r\n')
            stream.write( '    <div id="a-content">About</div>\r\n')
            stream.write( '    <a id="a-link" href="/">HOME</a>\r\n')
            stream.write('</div>\r\n')
            stream.end()
        })
    }
}
