jQuery(document).ready(function() {
    jQuery('.content').addClass("hiddenJs").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 300
    });

    jQuery('.content-2').addClass("hiddenJs").viewportChecker({
        classToAdd: 'visibleJs animated bounce',
        offset: 300
    });

    jQuery('.contact_us').addClass("hiddenJs").viewportChecker({
        classToAdd: 'visibleJs animated fadeIn',
        offset: 300
    });

    jQuery('.after-content').addClass("hiddenJs").viewportChecker({
        classToAdd: 'visibleJs animated fadeIn',
        offset: 300
    });

    jQuery('.footer').addClass("hiddenJs").viewportChecker({
        classToAdd: 'visibleJs animated slideInUp',
        offset: 10
    });
});