import Loader from '../Loader/Loader.js'
import Transition from '../Bundle/Common/Transition.js'

class AboutController {

    constructor (Listeners) {
        console.log('about constructor')
    }

    preload (opts) {
        console.log('about preload')

        Loader.run()
    }

    intro (opts) {
        console.log('about intro')

        const xhr = opts.xhr
        xhr.removeOld()
        xhr.insertNew()

        Transition.intro()
    }

    outro (done) {
        console.log('about outro')

        Transition.outro(done)
    }

}

export default AboutController
