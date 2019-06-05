<?php

class CatalogController {
    
    public function actionIndex() {
        
        $categories = [];
        $categories = Category::getCategoriesList();
        $products = [];
        $products = Product::getLatestProducts();
                
        require_once(ROOT . '/views/layot/header.php');
        require_once(ROOT . '/views/catalog/index.php');
        require_once(ROOT . '/views/layot/footer.php');
        
        return true;
    }
    
    public function actionCategory($categoryId, $page  = 1) {
        
        $categories = [];
        $categories = Category::getCategoriesList();
        
        $products = [];
        $products = Product::getProductsListByCategory($categoryId, $page);
        
        $total = Product::getTotalProductsInCetegory($categoryId);
        
        $pagination = new Pagination($total, $page, Product::SHOW_BY_DEFAULT, 'page-');
        
        
        
        require_once(ROOT . '/views/layot/header.php');
        require_once(ROOT . '/views/catalog/index.php');
        require_once(ROOT . '/views/layot/footer.php');
        
        return true;
        
    }
    
}