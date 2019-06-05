<?php
return [    
    
    'shortLink/get' => 'shortLink/get', //метод actionGet в контроллере ShortLinkController
    '([A-Za-z]+)' => 'shortLink/redirect', //метод actionRedirection в контроллере ShortLinkController
    '' => 'site/index' //метод actionIndex в контроллере SiteController
];