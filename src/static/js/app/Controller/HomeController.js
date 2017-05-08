import Loader from '../Bundle/Common/Loader.js'
import Transition from '../Bundle/Common/Transition.js'
import Over from '../Bundle/Common/Over.js'
import Resize from '../Bundle/Home/Resize.js'

class HomeController {

    constructor (Listeners) {
        console.log('home constructor')

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
                    onlyAtEnd: true
                },
                module: Resize,
                method: 'calculate'
            }
        })
    }

    preload (opts) {
        Loader.run(opts)
    }

    intro (opts) {
        Transition.intro(opts)
    }

    outro (opts) {
        opts.listeners.remove({
            destroy: true
        })

        Transition.outro(opts.done)
    }

}

export default HomeController
