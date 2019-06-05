<?php

class Product {
    
    const SHOW_BY_DEFAULT = 6; //кол-во товаров на странице
        
    // возвращает список последных продуктов
    public static function getLatestProducts($count = self::SHOW_BY_DEFAULT) {
        
        $count = intval($count);
        
        $db = Db::getConnection();
        
        $productList = [];
        
        $result = $db->query('SELECT `id`, `name`, `price`, `image`, `is_new` FROM product WHERE `status` = "1" ORDER BY `id` DESC LIMIT ' . $count);

        $i = 0;
        while($row = $result->fetch()) {
            $productList[$i]['id'] = $row['id'];
            $productList[$i]['name'] = $row['name'];
            $productList[$i]['price'] = $row['price'];
            $productList[$i]['image'] = $row['image'];
            $productList[$i]['is_new'] = $row['is_new'];
            
            $i++;
        }
        
        return $productList;
        
    }
    
    // возвращает список продуктов выбранной категории
      public static function getProductsListByCategory($id = false, $page = 1)  {
          
        if ($id) {
            
            $db = Db::getConnection();

            $productsList = [];
            
            $offset = ($page - 1) * self::SHOW_BY_DEFAULT;
            
            $result = $db->query('SELECT `id`, `name`, `price`, `image`, `is_new` FROM product WHERE `status` = "1" AND `category_id` = ' . $id . ' ORDER BY `id` DESC LIMIT ' . self::SHOW_BY_DEFAULT . ' OFFSET ' . $offset);

            $i = 0;
            while($row = $result->fetch()) {
                $productsList[$i]['id'] = $row['id'];
                $productsList[$i]['name'] = $row['name'];
                $productsList[$i]['price'] = $row['price'];
                $productsList[$i]['image'] = $row['image'];
                $productsList[$i]['is_new'] = $row['is_new'];
                $i++;
            }

            return $productsList;  
        }
          
      }
    
    // возвращаем товар по идентификатору
     public static function getProductById($id) {
         
         $id = intval($id);
         
         if($id) {
             
            $db = Db::getConnection();
             
            $result = $db->query('SELECT * FROM product WHERE `id` = ' . $id);
            $result->setFetchMode(PDO::FETCH_ASSOC);
             
            return $result->fetch();
             
         }
         
     }
    
    public static function getTotalProductsInCetegory($id) {
        
        $db = Db::getConnection();
        
        $result = $db->query('SELECT count(id) AS count FROM product WHERE `status` = "1" AND `category_id` = "' . $id . '"');
        $row = $result->fetch();
            
        return $row['count'];
    }
    
     public static function getProductsByIds($productsIds) {
         
         $products = [];
          
         $db = Db::getConnection();
         
         $idsString = implode(',', $productsIds);
        
         $sql = "SELECT * FROM product WHERE `status` = '1' AND `id` IN ($idsString)";
         
         $result = $db->query($sql);
         $result->setFetchMode(PDO::FETCH_ASSOC);
         
          $i = 0;
            while($row = $result->fetch()) {
                $products[$i]['id'] = $row['id'];
                $products[$i]['code'] = $row['code'];
                $products[$i]['name'] = $row['name'];
                $products[$i]['price'] = $row['price'];
                $i++;
            }
         
         return $products;
         
     }

    
}