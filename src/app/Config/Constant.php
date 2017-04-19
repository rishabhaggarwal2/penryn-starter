<?php

namespace App\Config;

class Constant {

    public static function init () {
        define('ROOT', $_SERVER['DOCUMENT_ROOT'] . '/');
    }

}
