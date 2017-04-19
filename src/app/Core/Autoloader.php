<?php

namespace App\Core;

class Autoloader {

    static function register () {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }

    static function autoload ($class) {
        if (strpos($class, 'App\\') === 0) {
            $class = str_replace('App\\', '', $class);
            $class = str_replace('\\', '/', $class);
            require ROOT . '/' . strtolower('app') . '/' . $class . '.php';
        }
    }

}
