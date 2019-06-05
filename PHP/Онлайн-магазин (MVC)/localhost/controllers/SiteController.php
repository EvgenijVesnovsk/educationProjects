<?php

class SiteController {
    
    public function actionIndex() {
        
        $categories = [];
        $categories = Category::getCategoriesList();
        $products = [];
        $products = Product::getLatestProducts(3);
                
        require_once(ROOT . '/views/layot/header.php');
        require_once(ROOT . '/views/site/index.php');
        require_once(ROOT . '/views/layot/footer.php');
        
        return true;
    }
    
}