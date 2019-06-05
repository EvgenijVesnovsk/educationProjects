<?php

class Magazine {
    
    public static function getMagazineList() {
        
        $pdo = Db::getConnection();
        
        $query = "SELECT * FROM `magazines_tbl` ORDER BY `create_at` DESC";
        
        $result = $pdo->query($query);
        
        return $result->fetchAll(PDO::FETCH_ASSOC);
            
    }
    
    public static function getMagazineById($id) {
        
        $pdo = Db::getConnection();
        
        $query = "SELECT * FROM `magazines_tbl` WHERE `id` = :id";
        
        $result = $pdo->prepare($query);
        $result->execute(['id' => $id]);
        return $result->fetch();
        
    }
    
    public static function addMagazine($name, $description, $img, $authors) {
        
        $pdo = Db::getConnection();
        
        $query = "INSERT INTO `magazines_tbl` (`name`, `description`, `img`, `authors`, `create_at`) VALUES (:name, :description, :img, :authors, NOW())";
        
        $result = $pdo->prepare($query);
        return $result->execute(['name' => $name,
                         'description' => $description,
                          'img' => $img,
                          'authors' => $authors
                         ]);
    }
    
    public static function updateMagazine($id, $name, $description, $img, $authors) {
        
        $pdo = Db::getConnection();
        
        $query = "UPDATE `magazines_tbl` SET `name` = :name, `description` = :description, `img` = :img, `authors` = :authors WHERE id = :id";
        
        $result = $pdo->prepare($query);
        return $result->execute(['name' => $name,
                         'description' => $description,
                          'img' => $img,
                          'authors' => $authors,
                          'id' => $id     
                         ]);
    }
    
    public static function deleteMagazine($id) {
        
        $pdo = Db::getConnection();
        
        $query = "DELETE FROM `magazines_tbl` WHERE `id` = :id";
        
        $result = $pdo->prepare($query);
        return $result->execute(['id' => $id]);
        
    }
    
    
    
}