<?php
/**
 * User: Shafeen M.
 * Date: 7/26/15
 * Time: 6:23 PM
 */

require_once("RESTfulRequestMethod.php");

abstract class PutRequest extends RESTfulRequestMethod {

    protected $put_vars;

    function verifyRequestType() {
        if ($_SERVER["REQUEST_METHOD"] != "PUT") {
            throw new Exception("Invalid HTTP Request Method for class.");
        }
    }

    function getRequestVars() {
        if (!$this->put_vars) {
            parse_str(file_get_contents("php://input"), $this->put_vars);
        }
        return $this->put_vars;
    }

}