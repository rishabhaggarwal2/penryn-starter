<?php

namespace Engine\Bundle\File;

class FileUpload {

    private static $file;
    private static $fileFutureName;
    private static $destinationFolder;
    private static $error;
    private static $ext;
    private static $type;

    public static function init ($type, $fileInputName, $fileFutureName, $destinationFolder) {
        self::$type              = $type;
        self::$file              = $_FILES[$fileInputName];
        self::$fileFutureName    = $fileFutureName;
        self::$destinationFolder = $destinationFolder;

        return self::extendedCode();
    }

    private static function extendedCode () {
        switch (true) {
            case self::$file['error'] > 0:
                self::$error = self::fileErrorCode();
                break;
            case self::checkExt():
                self::$error = 3;
                break;
            case self::checkSize():
                self::$error = 2;
                break;
            default:
                self::uploadFile();
                self::$error = 0;
        }

        return self::$error;
    }

    private static function fileErrorCode () {
        switch (self::$file['error']) {
            case 1:
                return 2;
                break;
            case 2:
                return 2;
                break;
            case 4:
                return 1;
                break;
            case 7:
                return 5;
                break;
            default:
                return 4;
        }
    }

    private static function checkSize () {
        // 1 Mo = 1048576 octets
        if (self::$file['size'] > 1048576) {
            return true;
        } else {
            return false;
        }
    }

    private static function checkExt () {
        if (self::$type === 'img') {
            $extArr = array('png','gif','jpg','jpeg');
        } else if (self::$type === 'pdf') {
            $extArr = array('pdf');
        } else {
            $extArr = false;
        }

        self::$ext = substr(strrchr(self::$file['name'], '.'), 1);

        if (in_array(self::$ext, $extArr)) {
            return false;
        } else {
            return true;
        }
    }

    private static function uploadFile () {
        $filePathWithoutExt = self::$destinationFolder . '/' . self::$fileFutureName;

        FileUnknowExt::delete($filePathWithoutExt);

        move_uploaded_file(self::$file['tmp_name'], $filePathWithoutExt . '.' . self::$ext);
    }

}
