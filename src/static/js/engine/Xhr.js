/*

CONTROLLER
──────────

Xhr.controller(pageName, myCallback, args);

function myCallback(response, args) {

    // Insert HTML
    app.insertAdjacentHTML('beforeend', response);

}

ONPOPSTATE
──────────

Xhr.onPopstate()

*/

import S from 'skylake'

class Xhr {

    static controller (page, callback, args) {
        const path = 'index.php?url=' + page + '&xhr=true'
        const xhr = new XMLHttpRequest()

        xhr.open('GET', path, true)

        xhr.onreadystatechange = _ => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const xhrC = JSON.parse(xhr.responseText).xhrController

                S.Geb.tag('title')[0].textContent = xhrC.title

                getHistoryUpdate()
                callback(xhrC.view, args)
            }
        }
        xhr.send(null)

        // Browser history update
        function getHistoryUpdate () {
            const pageUrl = page === 'home' ? '/' : page

            history.pushState({key: 'value'}, 'titre', pageUrl)
        }
    }

    static onPopstate () {
        const d = document
        const w = window

        let blockPopstateEvent = d.readyState !== 'complete'

        S.Listen(w, 'add', 'load', load)
        S.Listen(w, 'add', 'popstate', popstate)

        function load () {
            S.Delay(_ => {
                blockPopstateEvent = false
            }, 0)
        }

        function popstate (event) {
            if (blockPopstateEvent && d.readyState === 'complete') {
                event.preventDefault()
                event.stopImmediatePropagation()
            }
        }

        w.onpopstate = _ => {
            w.location.href = S.Win.path
        }
    }

}

export default Xhr
