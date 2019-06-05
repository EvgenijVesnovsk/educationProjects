<?php class ShortLinkController {
    
    public static function actionGet() {
        
        if (!empty($_POST['link'])) {
            
            //валидация
            $link = trim(strip_tags($_POST['link']));
            
            //проверка добавлялась ли такая ссылка ранее
            $isDublicate = ShortUrl::isDublicateUrl($link);
            
            if (!$isDublicate) {
                //если дубликата нет
                
                //массив возможных значений для формирования уникального URL
                $pattern = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z'];
                //длина массива

                $patternCount = count($pattern);

                //получаем последний короткий URL из БД
                $last = ShortUrl::getLastUrl();
                
                //формируем короткий url
                if(!$last) {
                    //если в БД еще нет записей
                    $short_url = "a";
                } else {
                    //если в БД есть записи
                    
                    //преобразуем строку в массив
                    $uriToArr = str_split($last);

                    //числовое представление массива
                    $numArr = [];        
                    for ($i=0; $i<count($uriToArr); $i++) {
                         $numArr[] = array_search($uriToArr[$i], $pattern);
                    }

                    //присваиваем следующее значение по порядку
                    for($i=0; $i<count($numArr); $i++) {
                        if($numArr[$i] < $patternCount - 1) {
                            $numArr[$i] = $numArr[$i] + 1;
                            break;
                        } else {
                            $numArr[$i] = 0;
                            if($i == count($numArr) - 1) {
                                $numArr[] = 0;
                                break;
                            } 
                        }
                    }

                    //строковое представление массива
                    $uri = "";
                    for($i=0; $i<count($numArr); $i++) {
                        $uri .= $pattern[$numArr[$i]];
                    }

                    //url
                    $short_url = $uri;   
                }

                //добавляем в БД
                $result = ShortUrl::addUrl($link, $short_url);

                //выводим
                if($result) echo "http://shorturl/" . $short_url;
                
            } else {
                //возвращаем ранее созданную короткую ссылку
                echo "http://shorturl/" . $isDublicate;
            }

        } else {
            echo "error";
        } 
     return true;   
    }
    
    public static function actionRedirect() {
        
        if (!empty($_SERVER['REQUEST_URI'])) {
            $url = trim($_SERVER['REQUEST_URI'], '/');
        }
        
        //вытаскиваем полную ссылку по короткой ссылке
        $link = ShortUrl::getLink($url);
        
        //перенаправляем
        header("Location: " . $link);
              
        return true;
        
    }
    
}
