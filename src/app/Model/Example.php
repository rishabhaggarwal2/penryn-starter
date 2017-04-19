<?php

namespace App\Model;

use \Engine\Model\Db;

class Example {

    public static function new ($data) {

        Db::getInstance()
            ->prepare(
                'INSERT INTO tablename (title, type) VALUES (:title, :type)')
            ->bind(':title', $data->title)
            ->bind(':type', $data->type)
            ->execute();
    }

    public static function update ($data) {

        Db::getInstance()
            ->prepare(
                'UPDATE tablename SET title = :title, type = :type WHERE id = :id')
            ->bind(':id', $data->id)
            ->bind(':title', $data->title)
            ->execute();
    }

    public static function delete ($id) {

        Db::getInstance()
            ->prepare('DELETE FROM tablename WHERE id = :id')
            ->bind(':id', $id)
            ->execute();

        // Reset id incrementation
        $lastId = self::getLastId();
        if (is_null($lastId)) {
            Db::getInstance()
                ->query('ALTER TABLE tablename AUTO_INCREMENT = 1')
                ->execute();
        }
    }

    public static function get ($id) {

        $data = Db::getInstance()
            ->prepare('SELECT * FROM tablename WHERE id = :id')
            ->bind(':id', $id)
            ->execute('fetch');

        return $data;
    }

    public static function getLastId () {

        $data = Db::getInstance()
            ->query('SELECT MAX(ID) FROM tablename')
            ->execute('fetch');

        return $data->{'MAX(ID)'};
    }

    public static function onlyOneActive () {

        $active = Db::getInstance()
            ->query('SELECT id FROM tablename WHERE active = 1')
            ->execute('fetch');

        Db::getInstance()
            ->prepare(
                'UPDATE tablename SET active = 0 WHERE id = :id')
            ->bind(':id', $active->id)
            ->execute();
    }

}
