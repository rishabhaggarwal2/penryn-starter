/*

RULES
─────

►►► Init module method when add listeners with "moduleInit" option on "true"
►►► Need outroM option only when initialize module

►►► Call module destroy method when remove listeners with destroy parameter

►►► All module callback method include 2 options : listeners & outroM
►►► Each module need : export default new MyModule()
►►► Arg is accessible in "init" and "destroy" methods

EXAMPLE
───────

class HomeController {

    constructor (Listeners) {
        Listeners.init({
            mouseenter: [
                {
                    el: '#h-link',
                    module: Over,
                    method: 'run'
                }
            ],
            ro: {
                throttle: {
                    delay: 200,
                    atEnd: true
                },
                module: Resize,
                method: 'calculate'
            }
        })
    }

    preload (opts) {
        opts.listeners.add()
    }

    intro (opts) {
        opts.listeners.add()
    }

    outro (done, listeners) {
        listeners.remove({
            destroy: true
        })
    }

}

*/

import S from 'skylake'

class Listeners {

    init (events) {
        const evs = events
        const speEvs = []
        this.normEvs = []
        this.moduleArr = []

        const keys = Object.keys(evs)
        const keysL = keys.length
        for (let i = 0; i < keysL; i++) {
            const ev = keys[i]
            const allEvContent = evs[keys[i]]
            const isSpeEv = ev === 'scroll' || ev === 'ro'
            const evContentL = isSpeEv ? 1 : allEvContent.length
            const arr = isSpeEv ? speEvs : this.normEvs

            for (let j = 0; j < evContentL; j++) {
                const evContent = isSpeEv ? allEvContent : allEvContent[j]
                const evContentModule = evContent.module
                // Normal & spe arr
                const obj = {
                    event: ev,
                    module: evContentModule,
                    method: evContent.method
                }
                if (isSpeEv) {
                    obj.throttle = evContent.throttle
                } else {
                    obj.el = evContent.el
                }
                arr.push(obj)
                // Common arr
                if (this.moduleArr.indexOf(evContentModule) < 0) {
                    this.moduleArr.push({
                        module: evContentModule,
                        arg: evContent.arg,
                        alreadyCalled: this.getAlreadyCalled(evContentModule)
                    })
                }
            }
        }

        this.normEvsL = this.normEvs.length
        this.speEvsL = speEvs.length
        this.moduleArrL = this.moduleArr.length
        this.speEvInstance = []

        // Normal events prepare
        for (let i = 0; i < this.normEvsL; i++) {
            const normEv = this.normEvs[i]
            normEv.callback = e => {
                const opts = {
                    event: e,
                    listeners: this,
                    outroM: this.outroM
                }
                normEv.module[normEv.method](opts)
            }
        }

        // Special events prepare
        for (let i = 0; i < this.speEvsL; i++) {
            const speEv = speEvs[i]
            const speEvIsScroll = speEv.event === 'scroll'
            const speEvSkylake = speEvIsScroll ? 'Scroll' : 'RO'
            this.speEvInstance[i] = new S[speEvSkylake]({
                callback: (s, d) => {
                    const opts = {
                        listeners: this,
                        outroM: this.outroM
                    }
                    if (speEvIsScroll) {
                        opts.currentScrollY = s
                        opts.delta = d
                    }
                    speEv.module[speEv.method](opts)
                },
                throttle: speEv.throttle
            })
        }
    }

    getAlreadyCalled (module) {
        const moduleArrL = this.moduleArr.length
        for (let i = 0; i < moduleArrL; i++) {
            if (module === this.moduleArr[i].module) {
                return true
            }
        }
        return false
    }

    add (opts) {
        if (opts && opts.moduleInit) {
            this.outroM = opts.outroM
            this.methodCall('init')
        }
        this.listen('add')
    }

    remove (opts) {
        const destroy = opts && opts.destroy !== undefined ? opts.destroy : false
        if (destroy) {
            this.methodCall('destroy')
        }
        this.listen('remove')
    }

    methodCall (name) {
        for (let i = 0; i < this.moduleArrL; i++) {
            const module = this.moduleArr[i].module
            if (!this.moduleArr[i].alreadyCalled && typeof module[name] === 'function') {
                module[name]({
                    outroM: this.outroM,
                    arg: this.moduleArr[i].arg
                })
            }
        }
    }

    listen (action) {
        for (let i = 0; i < this.speEvsL; i++) {
            const state = action === 'add' ? 'on' : 'off'
            this.speEvInstance[i][state]()
        }
        for (let i = 0; i < this.normEvsL; i++) {
            const normEv = this.normEvs[i]
            S.Listen(normEv.el, action, normEv.event, normEv.callback)
        }
    }

}

export default Listeners
