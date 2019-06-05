<?php
return [
    'authors/([0-9]+)' => 'authors/getAuthor/$1', //метод actionGetauthor в контроллере AuthorsController
    'authors/addAjax' => 'authors/addAjax', //метод actionAddAjax в контроллере AuthorsController
    'authors/updateAjax' => 'authors/updateAjax', //метод actionUpdateAjax в контроллере AuthorsController
    'authors/deleteAjax' => 'authors/deleteAjax', //метод actionDeleteAjax в контроллере AuthorsController
    'authors/update/([0-9]+)' => 'authors/update/$1', //метод actionUpdate в контроллере AuthorsController
    'authors/add' => 'authors/add', //метод actionAdd в контроллере AuthorsController
    'authors/([0-9]+)' => 'authors/index/$1', //метод actionIndex в контроллере AuthorsController
    'authors' => 'authors/index', //метод actionIndex в контроллере AuthorsController
    
    'magazine/paginationAjax' => 'magazine/paginationAjax', //метод actionPaginationAjax в контроллере MagazineController
    'magazine/addAjax' => 'magazine/addAjax', //метод actionAddAjax в контроллере MagazineController
    'magazine/updateAjax' => 'magazine/updateAjax', //метод actionUpdateAjax в контроллере MagazineController
    'magazine/deleteAjax' => 'magazine/deleteAjax', //метод actionDeleteAjax в контроллере MagazineController
    'magazine/update/([0-9]+)' => 'magazine/update/$1', //метод actionUpdate в контроллере MagazineController
    'magazine/add' => 'magazine/add', //метод actionAdd в контроллере MagazineController
    
    '([0-9]+)' => 'site/index/$1', //метод actionIndex в контроллере SiteController
    '' => 'site/index' //метод actionIndex в контроллере SiteController
];