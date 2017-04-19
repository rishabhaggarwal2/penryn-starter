const fs = require('fs')
const config = require('../../config/config.js')

module.exports = page => {
    for (let i = 0; i < page.qty; i++) {
        createJsController(i)
    }

    function createJsController (i) {
        const jsControllerName = page.completeController[i]
        const jsControllerDest = config.page.js.controller + jsControllerName + '.js'

        var stream = fs.createWriteStream(jsControllerDest)
        stream.once('open', _ => {
            stream.write('import Loader from \'../Loader/Loader.js\'\r\n')
            stream.write('import Transition from \'../Bundle/Common/Transition.js\'\r\n')
            stream.write('\r\n')
            stream.write('class ' + jsControllerName + ' {\r\n')
            stream.write('\r\n')
            stream.write('    constructor (Listeners) {\r\n')
            stream.write('        console.log(\'' + page.url[i] + ' constructor\')\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('    preload (opts) {\r\n')
            stream.write('        console.log(\'' + page.url[i] + ' preload\')\r\n')
            stream.write('\r\n')
            stream.write('        Loader.run()\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('    intro (opts) {\r\n')
            stream.write('        console.log(\'' + page.url[i] + ' intro\')\r\n')
            stream.write('\r\n')
            stream.write('        const xhr = opts.xhr\r\n')
            stream.write('        xhr.removeOld()\r\n')
            stream.write('        xhr.insertNew()\r\n')
            stream.write('\r\n')
            stream.write('        Transition.intro()\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('    outro (done) {\r\n')
            stream.write('        console.log(\'' + page.url[i] + ' outro\')\r\n')
            stream.write('\r\n')
            stream.write('        Transition.outro(done)\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('}\r\n')
            stream.write('\r\n')
            stream.write('export default ' + jsControllerName + '\r\n')
            stream.end()
        })
    }
}
