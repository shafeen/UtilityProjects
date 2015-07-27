<?php
/**
 * User: Shafeen M.
 * Date: 7/26/15
 * Time: 6:22 PM
 */

require_once("RESTfulRequestMethod.php");

abstract class GetRequest extends RESTfulRequestMethod{

    function verifyRequestType() {
        if ($_SERVER["REQUEST_METHOD"] != "GET") {
            throw new Exception("Invalid HTTP Request Method for class.");
        }
    }

    function getRequestVars() {
        return $_GET;
    }

}
