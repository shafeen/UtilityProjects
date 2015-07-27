<?php
/**
 * User: Shafeen M.
 * Date: 7/26/15
 * Time: 6:15 PM
 */


// GET, POST, PUT, DELETE
abstract class RESTfulRequestMethod {

    // verifyRequest should check to see that the request
    // method is what it claims it is (GET/POST/PUT/DELETE)
    abstract function verifyRequestType();

    abstract function getRequestVars();

    abstract function handleRequest();
}


