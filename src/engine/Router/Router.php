<?php

namespace Engine\Router;

use \App\Core\RedirectTo;

class Router {

    private $url;
    private $routes = [];
    private $errorController;

    public function __construct () {
        $this->url = $_GET['url'];
    }

    public function get ($path, $controller) {
        return $this->add($path, $controller, 'GET');
    }

    public function post ($path, $controller) {
        return $this->add($path, $controller, 'POST');
    }

    public function error ($errorController) {
        $this->errorController = $errorController;
    }

    public function add ($path, $controller, $method) {
        $route = new Route($path, $controller);
        $this->routes[$method][] = $route;
        return $route;
    }

    public function run () {
        // Get & Post
        foreach ($this->routes[$_SERVER['REQUEST_METHOD']] as $route) {
            if ($route->match($this->url)) {
                return $route->getController();
            }
        }

        // Error
        $controller = 'App\\Controller\\ErrorController';
        $controller = new $controller(false);
        return call_user_func([$controller, $this->errorController]);
    }

}
