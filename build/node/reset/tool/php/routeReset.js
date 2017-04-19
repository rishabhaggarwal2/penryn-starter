const fs = require('fs')
const config = require('../../config/config.js')

module.exports = _ => {
    const route = config.php.route

    const search = /( {8}\$router->get\(\'\/[^\'].*\r\n)+/g
    const replaceWith = '        $router->get(\'/about\', \'About#show\');\r\n'

    const content = fs.readFileSync(route, 'utf8')
    const replacement = content.replace(search, replaceWith)

    fs.writeFileSync(route, replacement, 'utf-8')
}
