<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <!-- Robots -->
        <meta name="robots" content="noindex, nofollow">
        <!-- Device -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <meta name="format-detection" content="telephone=no">
        <!-- SEO -->
        <title><?= $this->head['title']; ?></title>
        <!-- Favicon -->
        <!-- Link mask icon no compatible W3C → safari svg -->
        <link rel="apple-touch-icon" sizes="180x180" href="/static/media/fav/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="/static/media/fav/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/static/media/fav/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/static/media/fav/manifest.json">
        <link rel="shortcut icon" href="/static/media/fav/favicon.ico">
        <meta name="msapplication-config" content="/static/media/fav/browserconfig.xml">
        <meta name="theme-color" content="#000">
        <!-- Style -->
        <!-- CSS after Typekit is better -->
        <link rel="stylesheet" href="/static/style/css/app.css">
    </head>
    <body>
        <?php include ROOT . 'app/View/common/svg.php'; ?>
        <?php include ROOT . 'app/View/common/sail.php'; ?>
        <div id="app">
            <div id="xhr">
                <div id="p404">
                    <a href="/">BACK TO HOME</a>
                </div>
            </div>
            <?php include ROOT . 'app/View/common/loader.php'; ?>
        </div>
        <?php include ROOT . 'app/View/common/support.php'; ?>
        <!-- Script -->
        <script type="text/javascript" src="/static/js/app.js"></script>
    </body>
</html>
