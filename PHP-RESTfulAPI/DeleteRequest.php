<?php
/**
 * User: Shafeen M.
 * Date: 7/26/15
 * Time: 6:23 PM
 */

require_once("RESTfulRequestMethod.php");

abstract class DeleteRequest extends RESTfulRequestMethod {

    protected $delete_vars;

    function verifyRequestType() {
        if ($_SERVER["REQUEST_METHOD"] != "DELETE") {
            throw new Exception("Invalid HTTP Request Method for class.");
        }
    }

    function getRequestVars() {
        if (!$this->delete_vars) {
            parse_str(file_get_contents("php://input"), $this->delete_vars);
        }
        return $this->delete_vars;
    }

}