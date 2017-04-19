<?php

namespace Engine\Core;

class Autoloader {

    static function register () {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }

    static function autoload ($class) {
        if (strpos($class, 'Engine\\') === 0) {
            $class = str_replace('Engine\\', '', $class);
            $class = str_replace('\\', '/', $class);
            require ROOT . '/' . strtolower('engine') . '/' . $class . '.php';
        }
    }

}
