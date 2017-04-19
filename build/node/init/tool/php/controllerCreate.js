const fs = require('fs')
const config = require('../../config/config.js')

module.exports = page => {
    for (let i = 0; i < page.qty; i++) {
        createPhpController(i)
    }

    function createPhpController (i) {
        const phpControllerName = page.completeController[i]
        const phpControllerDest = config.page.php.controller + phpControllerName + '.php'

        var stream = fs.createWriteStream(phpControllerDest)
        stream.once('open', _ => {
            stream.write('<?php\r\n\r\n')
            stream.write('namespace App\\Controller;\r\n\r\n')
            stream.write('use \\Engine\\Controller\\Controller;\r\n\r\n')
            stream.write('class ' + phpControllerName + ' extends Controller {\r\n\r\n')
            stream.write('    public function show () {\r\n\r\n')
            stream.write('        /*------------------------------------\r\n')
            stream.write('            SEO\r\n')
            stream.write('        ------------------------------------*/\r\n\r\n')
            stream.write('        $this->head[\'title\'] = \'' + page.titleTag[i] + '\';\r\n')
            stream.write('        $this->head[\'description\'] = \'\';\r\n')
            stream.write('        $this->head[\'keywords\'] = \'\';\r\n')
            stream.write('        $this->head[\'opengraph\'] = \'/static/media/fav/open-graph/1200-630.png\';\r\n\r\n')
            stream.write('        /*------------------------------------\r\n')
            stream.write('            RENDER\r\n')
            stream.write('        ------------------------------------*/\r\n\r\n')
            stream.write('        $this->render(\'' + page.url[i] + '\');\r\n')
            stream.write('    }\r\n\r\n')
            stream.write('}\r\n')
            stream.end()
        })
    }
}
