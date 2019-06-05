<?php class MagazineController {
    
    public function actionAdd() {
        
        //получить список авторов
        $authors = Authors::getAuthorsList();
        
        require_once(ROOT . '/views/magazine/add.php');
        
        return true;
        
    }
    
    public function actionUpdate($id) {
        
        //получаем журнал по идентификатору
        $magazine = Magazine::getMagazineById($id);
        $magazineAuthors = explode(',', $magazine['authors']);

        //получаем список авторов
        $authors = Authors::getAuthorsList();
        
        require_once(ROOT . '/views/magazine/update.php');
        
        return true;
        
    }
        
    public function actionAddAjax() {   
        $error = [];
        //проверяем полученные данные
        if (!empty($_POST)) {
            //название
            if (!empty($_POST['name'])) {
                $name = htmlspecialchars($_POST['name']);
            } else {
              $error[] = "Введите название журнала<br/>";  
            }
            //описание
            if (!empty($_POST['description'])) {
                $description = htmlspecialchars($_POST['description']);
            } else {
                $description = null;
            }
            //картинка
            if (!empty($_FILES)) {
                if ($_FILES['file']['error'] > 0 ) { 
                    $error[] = "Ошибка загрузки файла: {$_FILES['file']['error']}<br/>";
                } else {     
                    if($_FILES['file']['size'] > 2097152) {
                        $error[] = "Файл больше 2Мб<br/>";
                    } else {
                        $tmp = $_FILES['file']['tmp_name'];
                    
                        $info = @getimagesize($tmp);
                    
                        if(preg_match('{image/(.*)}is', $info['mime'], $p)) {
                            $img = "template/images/magazines/" . time() . "." . $p[1];
                            move_uploaded_file($tmp, $img);
                            $img = "/" . $img;
                        }
                    }
                }    
            } else {
                //картинка по умолчанию
                $img = "/template/images/no-photo.png";
            }
            //авторы
            if (!empty($_POST['authors'])) {
                 $authors = htmlspecialchars($_POST['authors']);   
            } else {
              $error[] = "Укажите хотя бы одного автора<br/>";  
            }
            if (!$error) {   
                //добавляем журнал в БД
                $result = Magazine::addMagazine($name, $description, $img, $authors);
                if ($result) {
                    echo "Журнал успешно создан";
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
        //картинка по умолчанию
        $imgTmp = "/template/images/no-photo.png";
        
        $error = [];
        //проверяем полученные данные
        if (!empty($_POST)) {
            
            //идентификатор
            if (!empty($_POST['id'])) {
                $id = strip_tags($_POST['id']);
            } else {
              $error[] = "Не передан идентификатор записи<br/>";
              print_r($error);
            }
                     
            //название
            if (!empty($_POST['name'])) {
                $name = htmlspecialchars($_POST['name']);
            } else {
              $error[] = "Введите название журнала<br/>";  
            }
            //описание
            if (!empty($_POST['description'])) {
                $description = htmlspecialchars($_POST['description']);
            } else {
                $description = null;
            }
            
            //картинка
            if (!empty($_POST['img'])) {
                $imgOld = strip_tags($_POST['img']);
            }
            
            if (!empty($_FILES)) {
                if ($_FILES['file']['error'] > 0 ) { 
                    $error[] = "Ошибка загрузки файла: {$_FILES['file']['error']}<br/>";
                } else {     
                    if($_FILES['file']['size'] > 2097152) {
                        $error[] = "Файл больше 2Мб<br/>";
                    } else {
                        //добавляем новую картинку
                        $tmp = $_FILES['file']['tmp_name'];
                    
                        $info = @getimagesize($tmp);
                    
                        if(preg_match('{image/(.*)}is', $info['mime'], $p)) {
                            $imgNew = "template/images/magazines/" . time() . "." . $p[1];
                            move_uploaded_file($tmp, $imgNew);
                            $img = "/" . $imgNew;
                            
                            if (file_exists(ROOT . $imgOld)) {
                                if ($imgOld !== $imgTmp) unlink(ROOT . $imgOld);
                            } 
                        }
                    }
                }    
            } else {
                $img = $imgOld;
            }
            
            //авторы
            if (!empty($_POST['authors'])) {
                 $authors = htmlspecialchars($_POST['authors']);   
            } else {
              $error[] = "Укажите хотя бы одного автора<br/>";  
            }
            if (!$error) {   
                //добавляем журнал в БД
                $result = Magazine::updateMagazine($id, $name, $description, $img, $authors);
                if ($result) {
                    echo "Журнал успешно обновлен";
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
              $error[] = "Не передан идентификатор записи<br/>";
              print_r($error);
            }
        
        if (!$error) {
            
            //получаем журнал по идентификатору
            $magazine = Magazine::getMagazineById($id);
            //путь к картинке журнала
            $img = $magazine['img'];
//            echo "<pre>" . print_r($img) ."<pre>";
//            die;
            
            //удаляем журнал по идентификатору
            $result = Magazine::deleteMagazine($id);
                
            if ($result) {
                if (file_exists(ROOT . $img)) unlink(ROOT . $img);
                echo $id;
            } else {
                $error[] = "Произошла ошибка";
                print_r($error);    
            }    
        }
    
        return true;
        
    }
    
}
