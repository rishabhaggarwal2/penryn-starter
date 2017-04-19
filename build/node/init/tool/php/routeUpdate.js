const fs = require('fs')
const config = require('../../config/config.js')

module.exports = page => {
    const pageL = page.qty

    const content = fs.readFileSync(config.page.php.route, 'utf8')

    let newReplacement = ''
    for (let i = 0; i < pageL; i++) {
        const indentation = i === 0 ? '' : '        '
        const newLine = i === pageL - 1 ? '' : '\r\n'
        newReplacement += indentation + '$router->get(\'/' + page.url[i] + '\', \'' + page.controller[i] + '#show\');' + newLine
    }

    const replacement = content.replace('$router->get(\'/about\', \'About#show\');', newReplacement)
    fs.writeFileSync(config.page.php.route, replacement, 'utf-8')
}
