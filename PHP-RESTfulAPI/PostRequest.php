<?php
/**
 * User: Shafeen M.
 * Date: 7/26/15
 * Time: 6:23 PM
 */

require_once("RESTfulRequestMethod.php");

abstract class PostRequest extends RESTfulRequestMethod {

    function verifyRequestType() {
        if ($_SERVER["REQUEST_METHOD"] != "POST") {
            throw new Exception("Invalid HTTP Request Method for class.");
        }
    }

    function getRequestVars() {
        return $_POST;
    }

}