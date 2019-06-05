<?php

class ProductController {
    
    public function actionView($id) {
        
        $categories = [];
        $categories = Category::getCategoriesList();
        
        $product = Product::getProductById($id);
        
        require_once(ROOT . '/views/layot/header.php');
        require_once(ROOT . '/views/product/view.php');
        require_once(ROOT . '/views/layot/footer.php');
        
        return true;
    }
    
}