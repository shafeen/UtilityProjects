<?php
/**
 * Created by IntelliJ IDEA.
 * User: smahmud
 * Date: 5/12/2015
 * Time: 12:55 PM
 */

class View
{
    private $model;
    private $controller;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function output()
    {
        return "<p>" . $this->model->string . "</p>"; 
    }

    public function displayOutput()
    {
        echo $this->output();
    }
}