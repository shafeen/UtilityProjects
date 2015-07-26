<?php
/**
 * User: Shafeen M.
 * Date: 7/26/15
 * Time: 6:15 PM
 */


// GET, POST, PUT, DELETE
abstract class RESTfulRequestMethod {

    abstract function getRequestVars();

    abstract function handleRequest();
}


