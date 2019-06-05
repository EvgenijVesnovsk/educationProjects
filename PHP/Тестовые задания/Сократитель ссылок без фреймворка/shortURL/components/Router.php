<?php

class Router {
    
    private $routes;
    
    public function __construct() {
        // подключаем routes.php
        $routesPath = ROOT . '/config/routes.php';
        $this->routes = include($routesPath);
    }
    
    /* возвращаем строку с запросом пользователя из адресной строки */
    private function getURI() {
        if (!empty($_SERVER['REQUEST_URI'])) {
            return trim($_SERVER['REQUEST_URI'], '/');
        }
    }
    
    public function run() {
        // получить строку запроса
        $uri = $this->getURI();
//        var_dump($uri);
        
        // проверить наличие такого запроса в routes.php
        foreach ($this->routes as $uriPattern => $path) {
            
            
            if (preg_match("~$uriPattern~", $uri)) {
                
                // получаем внутренний путь из внешнего согласно правилу
                $internalRoute = preg_replace("~$uriPattern~", $path, $uri);
                
//                echo "<pre>";
//                var_dump($internalRoute);
//                 echo "</pre>";
//                die;
                
                // определяем контроллер, action, параметры
                $segments = explode('/', $internalRoute);
                
//                echo "<pre>";
//                var_dump($segments);
//                 echo "</pre>";
//                die;
                
                $controllerName = ucfirst(array_shift($segments)) . 'Controller';
                
                $actionName = 'action' . ucfirst(array_shift($segments));
                
//                var_dump($actionName);
//                die;
                
                $parameters = $segments;
                
                // если есть совпадения, определить какой action и контроллер обрабатывают запрос
                $controllerFile = ROOT . '/controllers/' . $controllerName . '.php';

                // подключить файл класса контроллера
                if (file_exists($controllerFile)) {
                    include_once($controllerFile);
                }

                // создать объект, вызвать метод (т.е. action)
                $controllerObject = new $controllerName;
                
//                var_dump($controllerFile);
//                die;
                
                $result = call_user_func_array(array($controllerObject, $actionName), $parameters);

                if ($result != null) {
                    break;
                }
            }
          
        }
    }
}