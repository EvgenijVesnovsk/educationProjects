$(document).ready(function() {
    $("input[name='post']").on('click', function() {
        $.ajax({
            url: 'http://rest-api/api/generate',
            success: function(response) {
                if (Array.isArray(response)) {
                    alert("Сгенерировано число: " + response[1] + ". Доступ по идентификатору: " + response[0]);    
                } else {
                    alert(response);
                }    
            }
        });
    });
    
    $("input[name='get']").on('click', function() {
        $.ajax({
            url: 'http://rest-api/api/retrieve',
            success: function(response) {
                 if (Array.isArray(response)) {
                    alert("Число: " + response[1] + ". Идентификатор: " + response[0]);    
                } else {
                    alert(response);
                }   
            }
        });
    });
});