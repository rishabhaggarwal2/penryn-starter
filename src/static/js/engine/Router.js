/*

CLASS
─────

Class "_tb"     →    targetBlank W3C compatible (target blank)
Class "_tbs"    →    targetBlank W3C compatible except for safari (target blank safari)
Class "_ost"    →    Xhr website : open link in same tab without prevent default (open same tab)
Class "_pr"     →    Not xhr website : prevent default

METHODS ARGS
────────────

contructor      →    Listeners
preload         →    opts : outroM
intro           →    opts : outroArgs / xhr / outroM (enable)
outro           →    done

PARALYSE OUTRO METHOD
─────────────────────

intro (opts) {
    const outroM = opts.outroM
    outroM.off()
}

INTRO XHR TRANSITION
────────────────────

intro (opts) {
    const xhr = opts.xhr
    xhr.removeOld()
    xhr.insertNew()
}

*/

import S from 'skylake'
import Xhr from './Xhr.js'
import Listeners from './Listeners.js'
import EventDelegation from './EventDelegation.js'

class Router {

    constructor (opts) {
        // Opts
        this.isXhr = opts.xhr

        // Parameters
        this.routes = []

        // Bind
        S.BindMaker(this, ['getInstance'])

        // Outro Method : paralyse outro method during animations
        this.outroM = {
            enable: true
        }
        this.outroM.on = _ => {
            this.outroM.enable = true
        }
        this.outroM.off = _ => {
            this.outroM.enable = false
        }

        // On popstate
        if (this.isXhr) {
            Xhr.onPopstate()
        }

        // Instantiating event delegation
        this.eventDelegation = new EventDelegation({
            isXhr: this.isXhr,
            getInstance: this.getInstance,
            outroM: this.outroM
        })
    }

    get (path, controller) {
        this.route = {
            path: this.slashTrim(path),
            controller: controller,
            params: [],
            instance: {},
            args: ''
        }
        this.routes.push(this.route)

        // Instantiating
        const Controller = this.route.controller
        this.route.instance.listeners = new Listeners()
        this.route.instance.controller = new Controller(this.route.instance.listeners)

        return this
    }

    width (param, regex) {
        this.route.params[param] = regex

        return this
    }

    error (errorController) {
        // Instantiating
        const ErrorController = errorController
        this.error.listeners = new Listeners()
        this.error.controller = new ErrorController(this.error.listeners)
    }

    run () {
        // Event delegation
        this.eventDelegation.run()

        // Preload
        const path = S.Win.path
        const instance = this.getInstance(path)
        instance.controller.preload({
            listeners: instance.listeners,
            outroM: this.outroM,
            path: {
                new: path
            }
        })
    }

    getInstance (url) {
        this.url = this.slashTrim(url)
        const routesL = this.routes.length

        // Page controller
        for (let i = 0; i < routesL; i++) {
            if (this.match(this.routes[i])) {
                return {
                    listeners: this.routes[i].instance.listeners,
                    controller: this.routes[i].instance.controller
                }
            }
        }

        // Error
        return {
            listeners: this.error.listeners,
            controller: this.error.controller
        }
    }

    match (route) {
        if (route.path === this.url) {
            return true
        }

        let path = route.path.replace(/:([\w]+)/g, (total, part1) => {
            return '(' + route.params[part1] + ')'
        })
        path = path.replace(/\//g, '\\/')
        const regex = new RegExp(path)
        const matches = this.url.match(regex)

        if (matches !== null) {
            if (matches.length > 1) {
                matches.shift()
                route.args = matches
                return true
            }
        }

        return false
    }

    slashTrim (string) {
        return string.replace(/^\/|\/$/g, '')
    }

}

export default Router
