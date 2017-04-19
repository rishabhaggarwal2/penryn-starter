<?php

namespace Engine\Model;

use \PDO;
use \App\Config\Database;

class Db {

    private static $_instance;
    private $pdoInstance;
    private $config;
    private $req;
    private $prepareReq;

    public static function getInstance () {
        if(is_null(self::$_instance)) {
            self::$_instance = new Db();
        }
        return self::$_instance;
    }

    public function __construct () {
        $this->pdoInstance = new PDO('mysql:host=' . $this->config('host') . ';dbname=' . $this->config('name') . ';charset=utf8', $this->config('user'), $this->config('pw'), array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    }

    public function config ($key) {
        $this->config = Database::config();
        return $this->config[$key];
    }

    public function query ($statement) {
        $this->prepareReq = false;
        $this->req = $this->pdoInstance->query($statement);
        return $this;
    }

    public function prepare ($statement) {
        $this->prepareReq = true;
        $this->req = $this->pdoInstance->prepare($statement);
        return $this;
    }

    public function bind ($param, $value) {
        switch (true) {
            case is_int($value):
                $type = PDO::PARAM_INT;
                break;
            case is_bool($value):
                $type = PDO::PARAM_BOOL;
                break;
            case is_null($value):
                $type = PDO::PARAM_NULL;
                break;
            default:
                $type = PDO::PARAM_STR;
        }
        $this->req->bindValue($param, $value, $type);
        return $this;
    }

    public function execute ($fetchType = false, $fetchStyle = false) {
        if ($this->prepareReq) {
            $this->req->execute();
        }
        if ($fetchType === 'fetchAll') {
            $data = $this->req->fetchAll(PDO::FETCH_OBJ);
        } else if ($fetchType === 'fetchColumn') {
            $data = $this->req->fetchColumn();
        } else if ($fetchType === 'fetch') {
            $data = $this->req->fetch(PDO::FETCH_OBJ);
        }
        $this->req->CloseCursor();
        if ($fetchType) {
            return $data;
        }
    }

}
