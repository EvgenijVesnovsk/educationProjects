<?php 

class Authors {
    
    public static function getAuthorsList() {
        
        $pdo = Db::getConnection();
        
        $query = "SELECT * FROM `authors_tbl` ORDER BY `surname`";
        
        $result = $pdo->query($query);
        
        return $result->fetchAll();
        
    }
    
    public static function getAuthorsById($id) {
        
        $pdo = Db::getConnection();
        
        $query = "SELECT * FROM `authors_tbl` WHERE `id` = :id";
        
        $result = $pdo->prepare($query);
        $result->execute(['id' => $id]);
        return $result->fetch();
            
    }
    
    public static function addAuthor($first_name, $surname, $second_name) {
        
        $pdo = Db::getConnection();
        
        $query = "INSERT INTO `authors_tbl` (`first_name`, `second_name`, `surname`) VALUES (:first_name, :second_name, :surname)";
        
        $result = $pdo->prepare($query);
        return $result->execute(['first_name' => $first_name,
                         'second_name' => $second_name,
                          'surname' => $surname
                         ]);
        
    }
    
     public static function updateAuthor($id, $first_name, $surname, $second_name) {
         
        $pdo = Db::getConnection();
        
        $query = "UPDATE `authors_tbl` SET `first_name` = :first_name, `surname` = :surname, `second_name` = :second_name WHERE id = :id";
        
        $result = $pdo->prepare($query);
        return $result->execute(['first_name' => $first_name,
                         'surname' => $surname,
                         'second_name' => $second_name,
                         'id' => $id   
                         ]);
         
     }
    
    public static function deleteAuthor($id) {
        
        $pdo = Db::getConnection();
        
        $query = "DELETE FROM `authors_tbl` WHERE `id` = :id";
        
        $result = $pdo->prepare($query);
        return $result->execute(['id' => $id]);
        
    }
    
}
