const fs = require('fs')
const config = require('../../config/config.js')

module.exports = page => {
    const pageL = page.qty
    const controllerName = []
    const route = config.page.js.route

    for (let i = 0; i < pageL; i++) {
        controllerName[i] = page.completeController[i]
    }

    fs.unlinkSync(route)
    createJsRoute()

    function createJsRoute () {
        var stream = fs.createWriteStream(route)
        stream.once('open', _ => {
            stream.write('/*\r\n')
            stream.write('\r\n')
            stream.write('router.get(\'/\', HomeController)\r\n')
            stream.write('router.get(\'/about\', AboutController)\r\n')
            stream.write('router.get(\'/work/:id/:name\', WorkOneController).width(\'id\', \'[0-9]+\').width(\'name\', \'[a-z0-9-]+\')\r\n')
            stream.write('router.get(\'/work/:type\', WorkAllController).width(\'type\', \'date|title\')\r\n')
            stream.write('router.get(\'/work\', WorkAllController)\r\n')
            stream.write('\r\n')
            stream.write('*/\r\n')
            stream.write('\r\n')
            stream.write('import Router from \'../../Engine/Router.js\'\r\n')
            stream.write('import ErrorController from \'../Controller/ErrorController.js\'\r\n')
            stream.write('import HomeController from \'../Controller/HomeController.js\'\r\n')
            for (let i = 0; i < pageL; i++) {
                stream.write('import ' + controllerName[i] + ' from \'../Controller/' + controllerName[i] + '.js\'\r\n')
            }
            stream.write('\r\n')
            stream.write('class Route {\r\n')
            stream.write('\r\n')
            stream.write('    constructor () {\r\n')
            stream.write('        const router = new Router({\r\n')
            stream.write('            xhr: true\r\n')
            stream.write('        })\r\n')
            stream.write('\r\n')
            stream.write('        router.get(\'/\', HomeController)\r\n')
            for (let i = 0; i < pageL; i++) {
                stream.write('        router.get(\'/' + page.url[i] + '\', ' + controllerName[i] + ')\r\n')
            }
            stream.write('\r\n')
            stream.write('        router.error(ErrorController)\r\n')
            stream.write('\r\n')
            stream.write('        router.run()\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('}\r\n')
            stream.write('\r\n')
            stream.write('export default Route\r\n')
            stream.end()
        })
    }

}
