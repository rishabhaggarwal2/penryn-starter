<?php

namespace Engine\Router;

class Route {

    private $path;
    private $controller;
    private $callArgs = [];
    private $params = [];

    public function __construct ($path, $controller) {
        $this->path = trim($path, '/');
        $this->controller = $controller;
    }

    public function with ($param, $regex) {
        $this->params[$param] = str_replace('(', '(?:', $regex);
        return $this;
    }

    public function match ($url) {
        $url = trim($url, '/');
        $path = preg_replace_callback('#:([\w]+)#', [$this, 'paramMatch'], $this->path);
        $path = str_replace('/', '\/', $path);
        $regex = '#^' . $path . '$#';
        if (!preg_match($regex, $url, $matches)) {
            return false;
        } else {
            array_shift($matches);
            $this->callArgs = $matches;
            return true;
        }
    }

    private function paramMatch ($match) {
        return '(' . $this->params[$match[1]] . ')';
    }

    public function getController () {
        $params = explode('#', $this->controller);
        $controller = 'App\\Controller\\' . $params[0] . 'Controller';
        $controller = new $controller($this->callArgs);
        return call_user_func_array([$controller, $params[1]], $this->callArgs);
    }

}
