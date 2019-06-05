$(document).ready(function () {

    //добавляем или редактируем журнал
    $("input[name='goMagazine']").on('click', function () {
        var name = $("input[name='name']").val();
        var description = $("input[name='description']").val();
        var authors = $("select[name='authors[]']").val();

        //определяем происходит добавление или редактирование журнала
        var method = $(this).attr('method');
        if (method == "update") {
            var img = $("img").attr('src');
            var id = $(".form_updatemagazine").attr('data-id');
        }

        // добавляем файл
        var file_data = $("input[type='file']").prop('files')[0];

        var form_data = new FormData();
        form_data.append('name', name);
        form_data.append('description', description);
        form_data.append('authors', authors);
        form_data.append('file', file_data);
        if (method == "update") {
            form_data.append('img', img);
            form_data.append('id', id);
        }

        //валидация
        var error = 0;
        $(".error").remove();
        //поле Название
        if (!name) {
            $("label[for='name']").before("<p class='error' style='color:red'>Введите название журнала</p>");
            error = 1;
        }
        //поле Авторы
        if (authors.length == 0) {
            $("label[for='authors']").before("<p class='error' style='color:red'>Выберите хотя бы одного автора</p>");
            error = 1;
        }

        if (!error) {
            $.ajax({
                url: '/magazine/' + method + 'Ajax',
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                type: 'post',
                data: form_data,
                success: function (response) {
                    alert(response);
                    
                }
            });
        }
    });

    //удаляем журнал
    $(".deleteMagazine").on('click', function () {
        var id = $(this).parent().attr('data-id');

        $.ajax({
            url: '/magazine/deleteAjax',
            type: 'post',
            data: {
                id: id
            },
            success: function (response) {

                if (!isNaN(response)) {
                    var block = $(".magazine_block[data-id=" + id + "]").remove();
                    alert("Журнал удален");
                } else {
                    alert(response);
                }


            }
        });
    });

    //добавляем или редактируем автора
    $("input[name='goAuthor']").on('click', function () {
        var first_name = $("input[name='first_name']").val();
        var surname = $("input[name='surname']").val();
        var second_name = $("input[name='second_name']").val();
        
        //определяем происходит добавление или редактирование журнала
        var method = $(this).attr('method');
        if (method == "update") {
            var id = $(".form_updateAuthor").attr('data-id');
        }

        // добавляем файл
        var form_data = new FormData();
        form_data.append('first_name', first_name);
        form_data.append('surname', surname);
        form_data.append('second_name', second_name);
        if (method == "update") {
            form_data.append('id', id);
        }

        //валидация
        var error = 0;
        $(".error").remove();
        //поле Название
        if (!first_name) {
            $("label[for='first_name']").before("<p class='error' style='color:red'>Введите имя автора</p>");
            error = 1;
        }

        if (!surname) {
            $("label[for='surname']").before("<p class='error' style='color:red'>Введите фамилию автора</p>");
            error = 1;
        }
        if (surname && surname.length < 3) {
            $("label[for='surname']").before("<p class='error' style='color:red'>Фамилия должна быть не короче 3-х символов</p>");
            error = 1;
        }

        if (!error) {
            $.ajax({
                url: '/authors/' + method + 'Ajax',
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                type: 'post',
                data: form_data,
                success: function (response) {
                    alert(response);
                }
            });
        };
    });

    //удаляем журнал
    $(".deleteAuthor").on('click', function () {
        var id = $(this).parent().attr('data-id');

        $.ajax({
            url: '/authors/deleteAjax',
            type: 'post',
            data: {
                id: id
            },
            success: function (response) {
                if (!isNaN(response)) {
                    var block = $(".author_block[data-id=" + id + "]").remove();
                    alert("Автор удален");
                } else {
                    alert(response);
                }
            }
        });
    });

});
