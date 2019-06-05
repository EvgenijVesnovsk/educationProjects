<?php

class Api {
    
    public $apiName = ''; //generate OR retrive

    public $requestUri = [];
    
    public function __construct() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
        
        //Массив GET параметров разделенных слешем
        $this->requestUri = explode('/', trim($_SERVER['REQUEST_URI'],'/'));
                
        if (array_key_exists(1, $this->requestUri)) $this->apiName = $this->requestUri[1];
    
    }
    
    public function run() {
        
        //Первые 2 элемента массива URI должны быть "api" и название таблицы
        if($this->requestUri[0] !== 'api' || ($this->apiName !== 'generate' && $this->apiName !== 'retrieve')){
            echo "Api не найден";
            exit;
        }

        //Если метод(действие) определен
        if (method_exists($this, $this->apiName)) {
            $number = $this->{$this->apiName}();
            
            try {
                $pdo = Db::getConnection();
                
                //формируем иднтификатор
                $query = "SELECT `id` FROM `randnumber_tbl` ORDER BY `id` DESC LIMIT 1";
                $result = $pdo->query($query);
                $id = $result->fetch(PDO::FETCH_ASSOC);
                
                if($id) {
                    $id = ++$id['id'];    
                } else {
                    $id = 1;   
                }
                
                //добавление числа в БД
                $query = "INSERT INTO `randnumber_tbl` (`id`, `number`) VALUES (:id, :number)";
        
                $result = $pdo->prepare($query);
                $result = $result->execute([
                    'id' => $id,
                    'number' => $number]);
                
                if ($result) {
                    $response = [$id, $number];
                    $response = json_encode($response);
                    echo $response;
                }

            } catch (PDOException $e) {
                echo "Ошибка выполнения запроса: " . $e->getMessage();
            }
            
        } else {
            echo "Метод не найден";
            exit;
        }
        
    }
    
    public function generate() {
        return rand();
    }
    
    public function retrieve() {
        if($this->requestUri[2])
        {
            //если идентификатор существует
            $id = (int)$this->requestUri[2];
            
            //если идентификатор число
            if($id) 
            {

            //получаем число по идентификатору              
                try 
                {
                    $pdo = Db::getConnection();

                    $query = "SELECT `number` FROM `randnumber_tbl` WHERE `id` = :id";

                    $result = $pdo->prepare($query);
                    $result->execute(['id' => $id]);

                    $number = $result->fetch(PDO::FETCH_ASSOC)['number'];

                    if ($number) {
                        $response = [$id, $number];
                        $response = json_encode($response);
                        echo $response;
                    } else {
                        echo "Число не найдено. Числа с заданным идентификатором не существует";
                        exit;
                    }

                } catch (PDOException $e) {
                    echo "Ошибка выполнения запроса: " . $e->getMessage();
                }
                
            } else {
                echo "Не правильно указан идентификатор. Укажите число";
                exit;
            }
            
        } else {
            echo "Не передан идентификатор записи";
            exit;
        }
    }
    
        
}
