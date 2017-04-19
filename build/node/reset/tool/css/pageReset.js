const fs = require('fs')
const config = require('../../config/config.js')

module.exports = page => {
    const folder = config.css.page

    fs.readdir(folder, (err, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i] !== '_home.css' && files[i] !== '_p404.css') {
                getUnlink(files[i])
            }
            if (i === files.length - 1) {
                createCssPage()
            }
        }
    })

    function getUnlink (file) {
        fs.unlink(folder + file)
    }

    function createCssPage () {
        var stream = fs.createWriteStream(folder + '_about.css')
        stream.once('open', _ => {
            stream.write('/*─────────────────────────────────────────────────────────────────────────────────────────────────*/\r\n')
            stream.write('/*─────────────────────────────────────────────────────────────────────────────────────────────────*/\r\n')
            stream.write('/*─\r\n')
            stream.write('/*─                                                                                    ABOUT\r\n')
            stream.write('/*─\r\n')
            stream.write('/*─────────────────────────────────────────────────────────────────────────────────────────────────*/\r\n')
            stream.write('/*─────────────────────────────────────────────────────────────────────────────────────────────────*/\r\n')
            stream.write('#a {\r\n')
            stream.write('    position: absolute;\r\n')
            stream.write('    top: 0;\r\n')
            stream.write('    left: 0;\r\n')
            stream.write('    bottom: 0;\r\n')
            stream.write('    right: 0;\r\n')
            stream.write('    background: #450049;\r\n')
            stream.write('    color: #fff;\r\n')
            stream.write('}\r\n')
            stream.write('#a-content {\r\n')
            stream.write('    position: absolute;\r\n')
            stream.write('    top: 0;\r\n')
            stream.write('    left: 0;\r\n')
            stream.write('    bottom: 0;\r\n')
            stream.write('    right: 0;\r\n')
            stream.write('    display: flex;\r\n')
            stream.write('    justify-content: center;\r\n')
            stream.write('    align-items: center;\r\n')
            stream.write('    font-size: 10vw;\r\n')
            stream.write('}\r\n')
            stream.write('#a-link {\r\n')
            stream.write('    position: absolute;\r\n')
            stream.write('    top: 2vw;\r\n')
            stream.write('    left: 2.2vw;\r\n')
            stream.write('    font-weight: 200;\r\n')
            stream.write('    letter-spacing: 0.05vw;\r\n')
            stream.write('    font-size: 0.9vw;\r\n')
            stream.write('    opacity: 0.7;\r\n')
            stream.write('}\r\n')
            stream.end()
        })
    }

}
