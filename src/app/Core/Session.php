<?php

namespace App\Core;

class Session {

    public static function start () {
        session_start();
    }

    public static function check () {
        if ($_SESSION['user'] !== 'Username') {
            RedirectTo::home();
        }
    }

    public static function init () {
        $_SESSION['user'] = 'Username';
    }

    public static function null () {
        $_SESSION['user'] = 0;
    }

    public static function destroy () {
        session_destroy();
        RedirectTo::home();
    }

}
