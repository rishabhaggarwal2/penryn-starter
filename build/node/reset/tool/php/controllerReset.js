const fs = require('fs')
const config = require('../../config/config.js')

module.exports = _ => {
    const folder = config.php.controller

    fs.readdir(folder, (err, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i] !== 'HomeController.php' && files[i] !== 'ErrorController.php') {
                getUnlink(files[i])
            }
            if (i === files.length - 1) {
                createAboutController()
            }
        }
    })

    function getUnlink (file) {
        fs.unlink(folder + file)
    }

    function createAboutController () {
        const phpControllerDest = folder + 'AboutController.php'

        var stream = fs.createWriteStream(phpControllerDest)
        stream.once('open', _ => {
            stream.write('<?php\r\n\r\n')
            stream.write('namespace App\\Controller;\r\n\r\n')
            stream.write('use \\Engine\\Controller\\Controller;\r\n\r\n')
            stream.write('class AboutController extends Controller {\r\n\r\n')
            stream.write('    public function show () {\r\n\r\n')
            stream.write('        /*------------------------------------\r\n')
            stream.write('            SEO\r\n')
            stream.write('        ------------------------------------*/\r\n\r\n')
            stream.write('        $this->head[\'title\'] = \'About\';\r\n')
            stream.write('        $this->head[\'description\'] = \'\';\r\n')
            stream.write('        $this->head[\'keywords\'] = \'\';\r\n')
            stream.write('        $this->head[\'opengraph\'] = \'/static/media/fav/open-graph/1200-630.png\';\r\n\r\n')
            stream.write('        /*------------------------------------\r\n')
            stream.write('            RENDER\r\n')
            stream.write('        ------------------------------------*/\r\n\r\n')
            stream.write('        $this->render(\'about\');\r\n')
            stream.write('    }\r\n\r\n')
            stream.write('}\r\n')
            stream.end()
        })
    }
}
