import Loader from '../Bundle/Common/Loader.js'
import Transition from '../Bundle/Common/Transition.js'

class AboutController {

    constructor (Listeners) {
        console.log('about constructor')
    }

    preload (opts) {
        console.log('about preload')

        Loader.run(opts)
    }

    intro (opts) {
        console.log('about intro')

        Transition.intro(opts)
    }

    outro (opts) {
        console.log('about outro')

        Transition.outro(opts.done)
    }

}

export default AboutController
