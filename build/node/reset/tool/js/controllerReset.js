const fs = require('fs')
const config = require('../../config/config.js')

module.exports = _ => {
    const folder = config.js.controller

    fs.readdir(folder, (err, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i] !== 'HomeController.js' && files[i] !== 'ErrorController.js') {
                getUnlink(files[i])
            }
            if (i === files.length - 1) {
                createJsController()
            }
        }
    })

    function getUnlink (file) {
        fs.unlink(folder + file)
    }

    function createJsController () {
        const jsControllerDest = config.js.controller + 'AboutController.js'

        var stream = fs.createWriteStream(jsControllerDest)
        stream.once('open', _ => {
            stream.write('import Loader from \'../Loader/Loader.js\'\r\n')
            stream.write('import Transition from \'../Bundle/Common/Transition.js\'\r\n')
            stream.write('\r\n')
            stream.write('class AboutController {\r\n')
            stream.write('\r\n')
            stream.write('    constructor (Listeners) {\r\n')
            stream.write('        console.log(\'about constructor\')\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('    preload (opts) {\r\n')
            stream.write('        console.log(\'about preload\')\r\n')
            stream.write('\r\n')
            stream.write('        Loader.run()\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('    intro (opts) {\r\n')
            stream.write('        console.log(\'about intro\')\r\n')
            stream.write('\r\n')
            stream.write('        const xhr = opts.xhr\r\n')
            stream.write('        xhr.removeOld()\r\n')
            stream.write('        xhr.insertNew()\r\n')
            stream.write('\r\n')
            stream.write('        Transition.intro()\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('    outro (done) {\r\n')
            stream.write('        console.log(\'about outro\')\r\n')
            stream.write('\r\n')
            stream.write('        Transition.outro(done)\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('}\r\n')
            stream.write('\r\n')
            stream.write('export default AboutController\r\n')
            stream.end()
        })
    }
}
