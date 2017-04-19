<?php

namespace App\Controller;

use \Engine\Controller\Controller;

class AboutController extends Controller {

    public function show () {

        /*------------------------------------
            SEO
        ------------------------------------*/

        $this->head['title'] = 'About';
        $this->head['description'] = '';
        $this->head['keywords'] = '';
        $this->head['opengraph'] = '/static/media/fav/open-graph/1200-630.png';

        /*------------------------------------
            RENDER
        ------------------------------------*/

        $this->render('about');
    }

}
