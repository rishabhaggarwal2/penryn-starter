module.exports = {
    language: [
        'src/app/View/base/main.php',
        'src/app/View/base/p404.php'
    ],
    page: {
        delete: [
            'src/app/Controller/AboutController.php',
            'src/app/View/page/about.php',
            'src/static/js/app/Controller/AboutController.js',
            'src/static/style/css/app/page/_about.css'
        ],
        php: {
            route: 'src/app/Core/Route.php',
            view: 'src/app/View/page/',
            controller: 'src/app/Controller/'
        },
        js: {
            route: 'src/static/js/app/Core/Route.js',
            controller: 'src/static/js/app/Controller/'
        },
        css: {
            page: 'src/static/style/css/app/page/'
        }
    }
}
