const readline = require('readline')
const colors = require('colors')
const isInt = require('./tool/isInt.js')
const languageChange = require('./tool/languageChange.js')
const pageInit = require('./tool/pageInit.js')
const capitalizeFirstLetter = require('./tool/capitalizeFirstLetter.js')

const languageQuestion = colors.yellow('\nLANGUAGE ?') + '\n1. EN\n2. FR\n\n'
const pageQtyQuestion = colors.yellow('\nHOW MANY SIMPLE PAGES WITHOUT HOME ?') + '\n\n'
const pageUrlQuestion = i => { return colors.yellow('\nURL OF PAGE ' + (i + 1) + ' ?') + '\n\n' }
const pageIdQuestion = i => { return colors.yellow('\nID OF PAGE ' + (i + 1) + ' ?') + '\n\n' }

const page = {
    url: [],
    titleTag: [],
    controller: [],
    completeController: [],
    cssTitle: [],
    id: []
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function getLanguageQuestion () {
    rl.question(languageQuestion, response => {
            if (response != 1 && response != 2) {
                getLanguageQuestion()
            } else {
                const language = response == 1 ? 'en' : 'fr'
                languageChange(language, _ => {
                    getPageQtyQuestion()
                })
            }
        }
    )
}

function getPageQtyQuestion () {
    rl.question(pageQtyQuestion, response => {
            if (isInt(response)) {
                page.qty = response
                getPageNameQuestion(0)
            } else {
                getPageQtyQuestion()
            }
        }
    )
}

function getPageNameQuestion (i) {
    rl.question(pageUrlQuestion(i), response1 => {
        page.url.push(response1)
        page.titleTag.push(page.url[i].replace(/-/g, ' ').replace(/\w\S*/g, function (x) { return capitalizeFirstLetter(x) }))
        page.controller.push(capitalizeFirstLetter(page.url[i].replace(/-/g, '')))
        page.completeController.push(page.controller[i] + 'Controller')
        page.cssTitle.push(response1.replace(/-/g, ' ').toUpperCase())

        rl.question(pageIdQuestion(i), response2 => {
            page.id.push(response2)

            if (i === page.qty - 1) {
                rl.close()
                pageInit(page)
            } else {
                getPageNameQuestion(i + 1)
            }
        })
    })
}

getLanguageQuestion()
