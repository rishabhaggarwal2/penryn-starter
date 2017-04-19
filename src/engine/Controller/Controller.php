<?php

namespace Engine\Controller;

use \stdClass;
use \Exception;
use \App\Config\Head;

class Controller {

    private $content;
    private $viewName;
    private $callArgs;
    protected $head;
    protected $data;

    public function __construct ($callArgs) {
        $this->callArgs = $callArgs;
        $this->data = new stdClass;
    }

    public function render ($viewName) {
        $this->head += Head::data();

        $urlPath = $_SERVER['REQUEST_URI'] === '/' ? '' : $_SERVER['REQUEST_URI'];
        $this->head['url'] = $this->head['domain'] . $urlPath;

        $this->content = $this->getContent(ROOT . 'app/View/page/' . $viewName . '.php');

        $xhr = isset($_GET['xhr']) ? true : false;

        if ($xhr) {
            $xhrController['title'] = $this->head['title'];
            $xhrController['view'] = $this->content;
            print json_encode(array('xhrController' => $xhrController));
        } else {
            echo $this->getContent(ROOT . 'app/View/base/main.php');
        }
    }

    public function renderError () {
        header('HTTP/1.1 404 Not Found', 404, TRUE);
        echo $this->getContent(ROOT . 'app/View/base/p404.php');
    }

    private function getContent ($fileName) {
        ob_start();
        require $fileName;
        return ob_get_clean();
    }

}
