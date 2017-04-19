<?php

namespace App\Controller;

use \Engine\Controller\Controller;

class ErrorController extends Controller {

    public function show () {

        /*------------------------------------
            TITLE TAG
        ------------------------------------*/

        $this->head['title'] = 'Error 404 - Not Found';

        /*------------------------------------
            RENDER ERROR
        ------------------------------------*/

        $this->renderError();
    }

}
