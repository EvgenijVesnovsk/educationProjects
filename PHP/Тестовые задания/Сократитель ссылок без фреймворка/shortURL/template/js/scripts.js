$(document).ready(function(){
    
    $("#getUrl").on('click', function(e) {
        e.preventDefault();
        var link = $("#url").val();
        
        if(link) {
           
            $.ajax({
                url: '/shortLink/get',
                type: 'post',
                data: {
                    link: link
                },
                success(response) {
                    console.log(response);
                    if (response !== "error") {
                        if(response) $("#shortUrl").empty().append("<p>Ваша короткая ссылка: " + response + "</p>");    
                    } else {
                        alert("Произошла ошибка на сервере");
                    }
                },
                error(e) {
                   alert("Произошла ошибка на сервере"); 
                }
            });
            
        } else {
        alert("Вы не ввели ссылку");   
        }
    });
    
});