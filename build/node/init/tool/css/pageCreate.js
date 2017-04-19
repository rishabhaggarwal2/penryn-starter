const fs = require('fs')
const config = require('../../config/config.js')

module.exports = page => {
    for (let i = 0; i < page.qty; i++) {
        createCssPage(i)
    }

    function createCssPage (i) {
        const cssPageDest = config.page.css.page + '_' + page.url[i] + '.css'
        const cssPageTitle = page.cssTitle[i]
        const cssPageTitleSpacesQty = 90 - cssPageTitle.length
        const cssPageTitleSpaces = Array(cssPageTitleSpacesQty).join(' ')
        const cssPageId = page.id[i]

        var stream = fs.createWriteStream(cssPageDest)
        stream.once('open', _ => {
            stream.write('/*─────────────────────────────────────────────────────────────────────────────────────────────────*/\r\n')
            stream.write('/*─────────────────────────────────────────────────────────────────────────────────────────────────*/\r\n')
            stream.write('/*─\r\n')
            stream.write('/*─' + cssPageTitleSpaces + cssPageTitle + '\r\n')
            stream.write('/*─\r\n')
            stream.write('/*─────────────────────────────────────────────────────────────────────────────────────────────────*/\r\n')
            stream.write('/*─────────────────────────────────────────────────────────────────────────────────────────────────*/\r\n')
            stream.write('#' + cssPageId + ' {\r\n')
            stream.write('    position: absolute;\r\n')
            stream.write('    top: 0;\r\n')
            stream.write('    left: 0;\r\n')
            stream.write('    bottom: 0;\r\n')
            stream.write('    right: 0;\r\n')
            stream.write('}\r\n')
            stream.end()
        })
    }

}
