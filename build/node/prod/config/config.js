module.exports = {
    src: 'src/',
    dest: 'dist/',
    compiler: {
        css: {
            entry: 'static/style/css/main.css',
            dest: 'static/style/css/app.css',
            autoprefixer: ['last 2 versions']
        },
        js: {
            entry: 'static/js/main.js',
            dest: 'static/js/app.js',
            eslint: 'build/node/common/config/.eslintrc'
        }
    },
    minify: {
        css: 'static/style/css/app.css',
        js: 'static/js/app.js',
        html: {
            view: 'app/View/',
            folder: ['base', 'common', 'page']
        }
    },
    copy: [
        '.htaccess',
        'index.php',
        'robots.txt',
        'sitemap.xml',
        'app/Bundle',
        'app/Config',
        'app/Controller',
        'app/Core',
        'app/Lib',
        'app/Model',
        'engine',
        'static/media',
        'static/style/font'
    ],
    metaRobotsUrl: 'app/View/base/main.php',
    internal: [
        'app/View/base/main.php',
        'app/View/base/p404.php'
    ],
    robots: [
        'app/View/base/main.php'
    ],
    additionalScript: []
}
