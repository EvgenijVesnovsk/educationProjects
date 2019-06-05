<?php

class User {
        
    // регистрация пользователя (добавление данных в БД)
    public static function register($name, $email, $password) {
        
        $db = Db::getConnection();

        $sql = 'INSERT INTO users (`name`, `email`, `password`) VALUES (:name, :email, :password)';
        
        $result = $db->prepare($sql);
        $result->bindParam(':name', $name, PDO::PARAM_STR);
        $result->bindParam(':email', $email, PDO::PARAM_STR);
        $result->bindParam(':password', $password, PDO::PARAM_STR);
              
        return $result->execute();
        
    }
    
    // валидация Имени
    public static function checkName($name) {
        
        if (strlen($name) >= 2) {
            return true;
        }
        return false;
        
    }
    
     // валидация Пароля
    public static function checkPassword($password) {
        
         if (strlen($password) >= 6) {
            return true;
        }
        return false;
        
    }
    
     public static function checkPhone($userPhone) {
         
         if (strlen($userPhone) >= 9) {
            return true;
        }
        return false;
         
     }
    
     // валидация Почты
    public static function checkEmail($email) {
        
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        }
        return false;
        
    }
    
    // проверка на существование дубликата почты
    public static function checkEmailExist($email) {
        
        $db = Db::getConnection();
        
        $sql = 'SELECT COUNT(*) FROM users WHERE `email` = :email';
        
        $result = $db->prepare($sql);
        $result->bindParam(':email', $email, PDO::PARAM_STR);
        $result->execute();
            
        if ($result->fetchColumn()) {
            return true;
        }
        return false;
        
    }
    
     public static function checkUserData($email, $password) {
         
        $db = Db::getConnection();
        
        $sql = 'SELECT * FROM users WHERE `email` = :email AND `password` = :password';
         
        $result = $db->prepare($sql);
        $result->bindParam(':email', $email, PDO::PARAM_STR);
        $result->bindParam(':password', $password, PDO::PARAM_STR);
        $result->execute();
         
        $user = $result->fetch();
            
        if($user) {
            return $user['id'];
        }
         return false;
         
     }
    
    public static function auth($userId) {
        
        $_SESSION['user'] = $userId;
        
    }
    
    public static function checkLogged() {
        
        if (isset($_SESSION['user'])) {
           return $_SESSION['user'];
        }
        
        header("Location: /user/login");
        
    }
    
    // проверка - залогинился ли пользователь или нет
     public static function isGuest() {
         
         if (isset($_SESSION['user'])) {
           return false;
        }
         return true;
         
     }
    
    // получаем информацию о пользователя по его идентификатору
     public static function getUserById($id) {
         
         if ($id) {
             
            $db = Db::getConnection();
        
            $sql = 'SELECT * FROM users WHERE `id` = :id';

            $result = $db->prepare($sql);
            $result->bindParam(':id', $id, PDO::PARAM_INT);
            
            $result->setFetchMode(PDO::FETCH_ASSOC); 
            $result->execute();

            return $result->fetch();
   
         }
        
     }
    
    //редактируем данные пользователя
     public static function edit($id, $name, $password) {
         
         $db = Db::getConnection();
        
         $sql = 'UPDATE users SET `name` = :name, `password` = :password WHERE `id` = :id';
         
         $result = $db->prepare($sql);
         $result->bindParam(':id', $id, PDO::PARAM_INT);
         $result->bindParam(':name', $name, PDO::PARAM_STR);
         $result->bindParam(':password', $password, PDO::PARAM_INT);

         return $result->execute();
       
     }
        
}