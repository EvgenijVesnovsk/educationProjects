<?php
return [
    
    'product/([0-9]+)' => 'product/view/$1', //метод actionView в контроллере ProductController
    
    'catalog' => 'catalog/index', //метод actionIndex в контроллере CatalogController
    
    'category/([0-9]+)/page-([0-9]+)' => 'catalog/category/$1/$2', //метод actionCategory в контроллере CatalogController
    'category/([0-9]+)' => 'catalog/category/$1', //метод actionCategory в контроллере CatalogController
    
    'cart/delete/([0-9]+)' => 'cart/delete/$1', //метод actionDelete в контроллере CartController
    
    'cart/checkout' => 'cart/checkout', //метод actionCheckout в контроллере CartController
    
    'cart/add/([0-9]+)' => 'cart/add/$1', //метод actionAdd в контроллере CartController
    
    'cart/addAjax/([0-9]+)' => 'cart/addAjax/$1', //метод actionAddAjax в контроллере CartController
    'cart' => 'cart/index', //метод actionIndex в контроллере CartController
    
    'user/register' => 'user/register', //метод actionRegister в контроллере UserController
    
    'user/login' => 'user/login', //метод actionLogin в контроллере UserController
    
    'user/logout' => 'user/logout', //метод actionLogout в контроллере UserController
    
    'cabinet/edit' => 'cabinet/edit', //метод actionEdit в контроллере CabinetController
    'cabinet' => 'cabinet/index', //метод actionIndex в контроллере CabinetController
        
    '' => 'site/index' //метод actionIndex в контроллере SiteController
];