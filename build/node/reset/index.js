const languageChange = require('./tool/languageChange.js')
const phpRouteReset = require('./tool/php/routeReset.js')
const phpControllerReset = require('./tool/php/controllerReset.js')
const phpViewReset = require('./tool/php/viewReset.js')
const jsRouteReset = require('./tool/js/routeReset.js')
const jsControllerReset = require('./tool/js/controllerReset.js')
const cssPageReset = require('./tool/css/pageReset.js')

languageChange(updatePages)

function updatePages () {
    phpRouteReset()
    phpControllerReset()
    phpViewReset()
    jsRouteReset()
    jsControllerReset()
    cssPageReset()
}
