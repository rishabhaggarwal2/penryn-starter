import S from 'skylake'
import Xhr from './Xhr.js'

class EventDelegation {

    constructor (opts) {
        // Opts
        this.isXhr = opts.isXhr
        this.getInstance = opts.getInstance
        this.outroM = opts.outroM

        // Parameters
        this.xhr = S.Geb.id('xhr')

        // Bind
        S.BindMaker(this, ['eventDelegation', 'done', 'xhrCallback'])
    }

    run () {
        S.Listen(S.Dom.body, 'add', 'click', this.eventDelegation)
    }

    eventDelegation (event) {
        let target = event.target
        let targetIsATag = false
        let targetIsASubmit = false

        while (target) {
            if (target.tagName === 'A') {
                targetIsATag = true
                break
            } else if (target.tagName === 'INPUT' && target.type === 'submit') {
                targetIsASubmit = true
                break
            } else if (target.tagName === 'BUTTON' && target.type === 'submit') {
                targetIsASubmit = true
                break
            }
            target = target.parentNode
        }

        if (targetIsATag) {
            const targetHref = target.href

            if (target.classList.contains('_tb')) {
                prD()
                window.open(targetHref)
            } else if (target.classList.contains('_tbs')) {
                prD()

                if (this.isTouch && this.isSafari) {
                    window.location.href = targetHref
                } else {
                    window.open(targetHref)
                }
            } else if (this.isXhr) {
                const hrefBeginByHash = targetHref.charAt(targetHref.length - 1) === '#'
                const hrefIsNotMailto = targetHref.substring(0, 6) !== 'mailto'
                const hrefHasNotOSTClass = !target.classList.contains('_ost')

                if (hrefBeginByHash) {
                    prD()
                } else if (hrefIsNotMailto && hrefHasNotOSTClass) {
                    prD()

                    if (this.outroM.enable) {
                        this.path = {
                            old: S.Win.path,
                            new: targetHref.replace(/^.*\/\/[^/]+/, '')
                        }

                        if (this.path.old !== this.path.new) {
                            // Outro method disable
                            this.outroM.off()

                            this.target = target
                            this.xhrReq()
                        }
                    }
                }
            } else if (target.classList.contains('_pr')) {
                prD()
            }
        } else if (targetIsASubmit) {
            if (this.isXhr) {
                prD()
            }
        }

        function prD () {
            event.preventDefault()
        }
    }

    xhrReq () {
        const oldInstance = this.getInstance(this.path.old)

        // Old outro
        oldInstance.controller.outro({
            done: this.done,
            listeners: oldInstance.listeners,
            outroM: this.outroM
        })
    }

    done (args) {
        Xhr.controller(this.path.new, this.xhrCallback, args)
    }

    xhrCallback (response, args) {
        const newInstance = this.getInstance(this.path.new)
        const xhr = {
            insertNew: _ => {
                this.xhr.insertAdjacentHTML('beforeend', response)
            },
            removeOld: _ => {
                const oldXhrContent = this.xhr.children[0]
                oldXhrContent.parentNode.removeChild(oldXhrContent)
            }
        }

        // Outro method enable
        this.outroM.on()

        // New intro
        newInstance.controller.intro({
            outroArgs: args,
            xhr: xhr,
            outroM: this.outroM,
            path: this.path,
            listeners: newInstance.listeners
        })
    }

}

export default EventDelegation
