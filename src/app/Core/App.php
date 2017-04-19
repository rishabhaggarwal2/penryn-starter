<?php

namespace App\Core;

use \App\Core\Route;

class App {

    public static function init () {
        require ROOT . 'engine/Core/Autoloader.php';
        \Engine\Core\Autoloader::register();
        require ROOT . 'app/Core/Autoloader.php';
        \App\Core\Autoloader::register();

        // Session::start();
        Route::init();
    }

}
