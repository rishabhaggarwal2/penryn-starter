<?php

namespace App\Config;

class Head {

    public static function data () {
        // Domain of desktop version
        $head['domain'] = 'http://www.example.com';

        $head['twitter']['pseudo']  = '';
        $head['twitter']['creator'] = '';

        return $head;
    }

}
