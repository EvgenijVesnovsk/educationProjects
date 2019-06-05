<?php class Pagination {
    
    private $posts = [];
    private $postCount;
    private $pageNumber;
    
    public function __construct($posts, $pageNumber = 1, $postCount = 10) {
        
        $this->posts = $posts;
        $this->postCount = $postCount;
        $this->pageNumber = $pageNumber;
    }
    
    //получем кол-во страниц в пагинации
    public function getPageCount() {
        
        return ceil(count($this->posts) / $this->postCount);
        
    }
    
    //получаем массив с записями для конкретной страницы пагинации
    public function getPagination() {
        
        //параметр от и до
        $to = $this->pageNumber * $this->postCount - 1; //до
        $from = $to - ($this->postCount - 1); //от
        
        $newArr = [];
        
        for($i = $from; $i <= $to; $i++) {    
            if (array_key_exists($i, $this->posts)) {
                $newArr[] = $this->posts[$i];
            }
        }
        
        return $newArr;
        
    }
    
}