<?php

class SiteController {
    
    public function actionIndex($page = 1) {
                
        //список журналов
        $magazines = Magazine::getMagazineList();
        
        //список авторов
        $authors = Authors::getAuthorsList();
        
        //пагинация
        //по умолчанию выводит 10 записей на странице. Для изменения нужно передать третьим параметром в new Pagination кол-во страниц
        $magazines = new Pagination($magazines, $page);
        $pageCount = $magazines->getPageCount();
        $magazines = $magazines->getPagination();
                    
        require_once(ROOT . '/views/site/index.php');
        
        return true;
    }
    
}
