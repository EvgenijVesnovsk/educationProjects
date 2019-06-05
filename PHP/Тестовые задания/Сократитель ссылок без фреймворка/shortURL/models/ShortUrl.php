<?php class ShortUrl {
    
    public static function isDublicateUrl($link) {
        
        $pdo = Db::getConnection();
        
        $query = "SELECT `short_url` FROM `url_tbl` WHERE `link` = :link";
        
        $result = $pdo->prepare($query);
        $result->execute([
                'link' => $link
            ]);
         
        $result = $result->fetch(PDO::FETCH_ASSOC);
        return $result['short_url'];
    }
    
    public static function getLastUrl() {
        
        $pdo = Db::getConnection();
        
        $query = "SELECT `short_url` FROM `url_tbl` ORDER BY `id` DESC LIMIT 1";
        
        $last = $pdo->query($query);
        $last = $last->fetch(PDO::FETCH_ASSOC);
        return $last['short_url'];
        
    }
    
    public static function addUrl($link, $short_url) {
        
        $pdo = Db::getConnection();
        
        $query = "INSERT INTO `url_tbl` (`link`, `short_url`) VALUES (:link, :short_url)";
        
        $result = $pdo->prepare($query);
        return $result->execute([
                'link' => $link,
                'short_url' => $short_url
            ]);
        
    }
    
     public static function getLink($url) {
         
        $pdo = Db::getConnection();
        
        $query = "SELECT `link` FROM `url_tbl` WHERE `short_url` = :url";
        
        $result = $pdo->prepare($query);
        $result->execute([
                'url' => $url
            ]);
         
        $result = $result->fetch(PDO::FETCH_ASSOC);
        return $result['link'];
         
     }
    
}
