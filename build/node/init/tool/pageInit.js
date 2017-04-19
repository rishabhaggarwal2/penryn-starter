const pageDelete = require('./pageDelete.js')
const phpRouteUpdate = require('./php/routeUpdate.js')
const phpViewCreate = require('./php/viewCreate.js')
const phpControllerCreate = require('./php/controllerCreate.js')
const jsRouteUpdate = require('./js/routeUpdate.js')
const jsControllerCreate = require('./js/controllerCreate.js')
const cssPageCreate = require('./css/pageCreate.js')

module.exports = (page) => {
    pageDelete(initPage)

    function initPage () {
        // Php
        phpRouteUpdate(page)
        phpViewCreate(page)
        phpControllerCreate(page)

        // Js
        jsRouteUpdate(page)
        jsControllerCreate(page)

        // Css
        cssPageCreate(page)
    }
}
