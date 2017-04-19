<!doctype html>
<html lang="en">
    <head itemscope>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link rel="canonical" href="<?= $this->head['url']; ?>">
        <!-- Robots -->
        <meta name="robots" content="noindex, nofollow">
        <!-- Device -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <meta name="format-detection" content="telephone=no">
        <!-- SEO -->
        <title><?= $this->head['title']; ?></title>
        <meta name="description" content="<?= $this->head['description']; ?>">
        <meta name="keywords" content="<?= $this->head['keywords']; ?>">
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="<?= $this->head['twitter']['pseudo']; ?>">
        <meta name="twitter:creator" content="<?= $this->head['twitter']['creator']; ?>">
        <meta name="twitter:title" content="<?= $this->head['title']; ?>">
        <meta name="twitter:description" content="<?= $this->head['description']; ?>">
        <meta name="twitter:image:src" content="<?= $this->head['opengraph']; ?>">
        <!-- Google+ -->
        <meta itemprop="name" content="<?= $this->head['title']; ?>">
        <meta itemprop="description" content="<?= $this->head['description']; ?>">
        <meta itemprop="image" content="<?= $this->head['opengraph']; ?>">
        <!-- Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="<?= $this->head['url']; ?>">
        <meta property="og:title" content="<?= $this->head['title']; ?>">
        <meta property="og:description" content="<?= $this->head['description']; ?>">
        <meta property="og:image" content="<?= $this->head['opengraph']; ?>">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
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
                <?= $this->content; ?>
            </div>
            <?php include ROOT . 'app/View/common/loader.php'; ?>
        </div>
        <?php include ROOT . 'app/View/common/support.php'; ?>
        <!-- Script -->
        <script type="text/javascript" src="/static/js/app.js"></script>
        <!-- Google Analytics -->
        <script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','XX-XXXXXXXX-X','auto');ga('send','pageview');</script>
    </body>
</html>
