<?php class AuthorsController {
    
    public function actionIndex($page = 1) {
        
        //список авторов
        $authors = Authors::getAuthorsList();
        
        //пагинация
        //по умолчанию выводит 10 записей на странице. Для изменения нужно передать третьим параметром в new Pagination кол-во страниц
        $authors = new Pagination($authors, $page);
        $pageCount = $authors->getPageCount();
        $authors = $authors->getPagination();
    
        require_once(ROOT . '/views/authors/index.php');
        
        return true;
        
    }
    
    public function actionGetAuthor($id) {
        
        //получить автора по идентификатору
        $authorById = Authors::getAuthorsById($id);
        
        //список журналов
        $magazines = Magazine::getMagazineList();
        
        $magazinesListByAuthor = [];
        foreach($magazines as $magazine) {
            if (strpos($magazine['authors'], $id) !== false) $magazinesListByAuthor[] = ['id' => $magazine['id'],
                                                                                         'name' =>$magazine['name']
                                                                                        ];   
        }

        require_once(ROOT . '/views/authors/index.php');
        
        return true;
        
    }
    
    public function actionAdd() {
        
        require_once(ROOT . '/views/authors/add.php');
        
        return true;
        
    }
    
    public function actionUpdate($id) {
        
        //получаем автора по идентификатору
        $author = Authors::getAuthorsById($id);
        
        require_once(ROOT . '/views/authors/update.php');
        
        return true;
        
    }
    
    public function actionAddAjax() {
        
        $error = [];
        
        //проверяем полученные данные
        if (!empty($_POST)) {
        
            //имя автора
            if (!empty($_POST['first_name'])) {
                $first_name = htmlspecialchars($_POST['first_name']);
            } else {
              $error[] = "Введите имя автора<br/>";  
            }
            
            //фамилия автора
            if (!empty($_POST['surname'])) {
                if(mb_strlen($_POST['surname'],'UTF-8') >= 3) {
                    $surname = htmlspecialchars($_POST['surname']);
                } else {
                     $error[] = "Фамилия должна быть не короче 3-х символов<br/>";  
                }
            } else {
              $error[] = "Введите Фамилию автора<br/>";  
            }
            
            //отчетсво автора
            if (!empty($_POST['second_name'])) {
                $second_name = htmlspecialchars($_POST['second_name']);
            } else {
                $second_name = null; 
            }
            
            if (!$error) {
                
                //добавляем автора в БД
                $result = Authors::addAuthor($first_name, $surname, $second_name);
                
                if ($result) {
                    echo "Автор добавлен";
                } else {
                    $error[] = "Произошла ошибка";
                    print_r($error);    
                }
                
            } else {
                print_r($error);  
            }
            
        } else {
            
            $error[] = "Ошибка передачи данных";
            print_r($error);
        }
        
        return true;
        
    }
    
    public function actionUpdateAjax() {         
        $error = [];
        //проверяем полученные данные
        if (!empty($_POST)) {
            
            //идентификатор
            if (!empty($_POST['id'])) {
                $id = strip_tags($_POST['id']);
            } else {
              $error[] = "Не передан идентификатор автора<br/>";
              print_r($error);
            }
                     
            //имя автора
            if (!empty($_POST['first_name'])) {
                $first_name = htmlspecialchars($_POST['first_name']);
            } else {
              $error[] = "Введите имя автора<br/>";  
            }
            
            //фамилия автора
            if (!empty($_POST['surname'])) {
                if(mb_strlen($_POST['surname'],'UTF-8') >= 3) {
                    $surname = htmlspecialchars($_POST['surname']);
                } else {
                     $error[] = "Фамилия должна быть не короче 3-х символов<br/>";  
                }
            } else {
              $error[] = "Введите Фамилию автора<br/>";  
            }
            
            //отчетсво автора
            if (!empty($_POST['second_name'])) {
                $second_name = htmlspecialchars($_POST['second_name']);
            } else {
                $second_name = null; 
            }
            
            if (!$error) {   
                //добавляем журнал в БД
                $result = Authors::updateAuthor($id, $first_name, $surname, $second_name);
                if ($result) {
                    echo "Автор успешно обновлен";
                } else {
                    $error[] = "Произошла ошибка";
                    print_r($error);    
                }
            } else {
                print_r($error);  
            }
            
        } else {
            
            $error[] = "Ошибка передачи данных";
            print_r($error);
        }
        
        return true;
    }
    
    public function actionDeleteAjax() {
        
        $error = [];
        //проверяем полученные данные
        //идентификатор
            if (!empty($_POST['id'])) {
                $id = strip_tags($_POST['id']);
            } else {
              $error[] = "Не передан идентификатор автора<br/>";
              print_r($error);
            }
        
        if (!$error) {            
            //удаляем журнал по идентификатору
            $result = Authors::deleteAuthor($id);
                
            if ($result) {
                echo $id;
            } else {
                $error[] = "Произошла ошибка";
                print_r($error);    
            }    
        }
    
        return true;
        
    }
    
}