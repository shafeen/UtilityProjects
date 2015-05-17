<?php
/**
 * Created by IntelliJ IDEA.
 * User: smahmud
 * Date: 5/12/2015
 * Time: 12:56 PM
 */

class Controller
{
    private $model;

    private $actionRegistryMap;


    public function __construct($model)
    {
        $this->model = $model;
        $this->actionRegistryMap = array('clicked'=>'');
        $this->control();
    }

    public function control()
    {
        $this->resolveAction();
    }

    // 'action' names resolve into a function named after that action
    // example, ?action=clicked will trigger the clicked() function.
    private function resolveAction()
    {
        if (isset($_REQUEST['action']) && !empty($_REQUEST['action'])) {
            if(array_key_exists($_REQUEST['action'], $this->actionRegistryMap)) {
                $this->{$_REQUEST['action']}();
            }
        }
    }


    public function clicked()
    {
        $this->model->string = "Updated Data, thanks to MVC and PHP!";
    }


}