<?php

namespace App\Controller;

use \Engine\Controller\Controller;

class HomeController extends Controller {

    public function show () {

        /*------------------------------------
            MESSAGE
        ------------------------------------*/

        $this->data->msg = 'Home';

        /*------------------------------------
            SEO
        ------------------------------------*/

        $this->head['title'] = 'Home';
        $this->head['description'] = '';
        $this->head['keywords'] = '';
        $this->head['opengraph'] = '/static/media/fav/open-graph/1200-630.png';

        /*------------------------------------
            RENDER
        ------------------------------------*/

        $this->render('home');
    }

}
