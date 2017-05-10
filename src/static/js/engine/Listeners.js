/*

RULES
─────

►►► Init module method when add listeners with "moduleInit" option on "true"
►►► Need outroM argument only when initialize module

►►► Call module destroy method when remove listeners with destroy boolean parameter

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
            keydown: [
                {
                    module: Slide,
                    method: 'keydown'
                }
            ],
            ro: {
                throttle: {
                    delay: 200,
                    onlyAtEnd: true
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
        this.speOpts = {}

        const spe = {
            scroll: {
                throttle: true,
                skylake: 'Scroll'
            },
            ro: {
                throttle: true,
                skylake: 'RO'
            },
            wt: {
                throttle: false,
                skylake: 'WT'
            }
        }

        const keys = Object.keys(evs)
        const keysL = keys.length
        for (let i = 0; i < keysL; i++) {
            const ev = keys[i]
            const allEvContent = evs[keys[i]]
            const isSpeEv = spe[ev] !== undefined
            const isThrottle = isSpeEv ? spe[ev].throttle : false
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
                if (isThrottle) {
                    obj.throttle = evContent.throttle
                } else {
                    obj.el = evContent.el || document
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
            const speEvSkylake = spe[speEv.event].skylake

            let opts
            this.speOpts.listeners = this

            if (speEvSkylake === 'Scroll') {
                opts = {
                    callback: (s, d) => {
                        this.speOpts.currentScrollY = s
                        this.speOpts.delta = d
                        speEv.module[speEv.method](this.speOpts)
                    },
                    throttle: speEv.throttle
                }
            } else if (speEvSkylake === 'WT') {
                opts = (d, t, e) => {
                    this.speOpts.delta = d
                    this.speOpts.type = t
                    this.speOpts.event = e
                    speEv.module[speEv.method](this.speOpts)
                }
            } else if (speEvSkylake === 'RO') {
                opts = {
                    callback: _ => {
                        speEv.module[speEv.method](opts)
                    },
                    throttle: speEv.throttle
                }
            }
            this.speEvInstance[i] = new S[speEvSkylake](opts)
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
            this.outroM = this.speOpts.outroM = opts.outroM
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
                    listeners: this,
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
