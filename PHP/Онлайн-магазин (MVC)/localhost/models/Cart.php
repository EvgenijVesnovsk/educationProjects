<?php

class Cart {
        
    // добавляем товар в корзину
    public static function addProduct($id) {
        
        $id = intval($id);
        
        // пустой массив для товаров в корзине
        $productsInCart = [];
        
        if (isset($_SESSION['products'])) {
            $productsInCart = $_SESSION['products'];
        }
        
        if (array_key_exists($id, $productsInCart)) {
            $productsInCart[$id] ++;
        } else {
            $productsInCart[$id] = 1;
        }
        
        $_SESSION['products'] = $productsInCart;
        
        return self::countItems();
        
    }
    
        // удаляем товар из корзины
    public static function deleteProduct($id) {
        
        $id = intval($id);
        
        if (isset($_SESSION['products'])) {
            
            $productsInCart = $_SESSION['products'];
            
        }
        
        if (array_key_exists($id, $productsInCart)) {
            unset($productsInCart[$id]);          
        };
        
        $_SESSION['products'] = $productsInCart;
        
        return self::countItems();
        
    }
    
    // очищаем корзину
     public static function clear() {
         
         if (isset( $_SESSION['products'])) {
             unset( $_SESSION['products']);
         }
         
     }
    
    // считаем сколько товаров добавлено в корзину
    public static function countItems() {
        
        if(isset($_SESSION['products'])) {
            $count = 0;
            foreach($_SESSION['products'] as $id => $quantity) {
                $count = $count + $quantity;
            }
            return $count;
        } else {
            return 0;
        }
        
    }
    
    public static function getProducts() {
        
        if(isset($_SESSION['products'])) {
            return $_SESSION['products'];
        }
        return false;
        
    }
    
     public static function getTotalPrice($products) {
         
         $productInCart = self::getProducts();
         
         $total = 0;
         
         if($productInCart) {
            
             foreach($products as $item) {
                $total += $item['price'] * $productInCart[$item['id']];
            }
             
         }
         
         return $total;
         
     }
    
}