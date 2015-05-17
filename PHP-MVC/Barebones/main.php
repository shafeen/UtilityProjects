<?php
/**
 * Created by IntelliJ IDEA.
 * User: smahmud
 * Date: 5/12/2015
 * Time: 1:08 PM
 */

include_once "./ClickableModel.class.php";
include_once "./View.class.php";
include_once "./Controller.class.php";


/*
  Decide which Model, View or Controller to use here.
 */

$model = new ClickableModel();
$controller = new Controller($model);
$view = new View($model);

$view->displayOutput();

