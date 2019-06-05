$(document).ready(function () {

    //расписание поездок
    $("input[name='timeTable']").on('click', function () {
        var departure_date = $("input[name='since']").val();
        var arrival_date = $("input[name='to']").val();

        if (departure_date !== "" && arrival_date !== "") {

            $.ajax({
                url: 'components/timeTableAjax.php',
                type: 'post',
                data: {
                    departure_date: departure_date,
                    arrival_date: arrival_date
                },
                success: function (response) {
                    var arr = $.parseJSON(response);
                    var str = "";
                    for (var i = 0; i < arr.length; i++) {
                        str += "<div class='trips_block'>";
                        str += "<p>ФИО: " + arr[i]['surname'] + " " + arr[i]['first_name'] + " " + arr[i]['second_name'] + "</p>";
                        str += "<p>Регион: " + arr[i]['region'] + "</p>";
                        str += "<p>Дата выезда: " + arr[i]['departure_date'] + "</p>";
                        str += "<p>Дата приезда: " + arr[i]['arrival_date'] + "</p>";
                        str += "</div>";
                    }
                    $(".trips").html(str);
                }

            });

        } else {
            alert("Заполните, пожалуйста, все поля");
        }

    });

    //при выборе региона разблокируем дату отправления
    $("#region").on('change', function () {
        var region = parseInt($("#region").val());
        var departure_date = $("#departure_date");
        $("#curier").attr("disabled", "").empty().append("<option disable>Выберите курьера</option>");
        
        departure_date.val("");
        $("#arrival_date").val("");
        if (!region) {
            departure_date.attr("disabled", "");
            
        } else {
            departure_date.removeAttr("disabled");
        }
    });

    //при выборе даты отправления
    $("#departure_date").on('change', function () {
        //высчитываем дату возвращения курьера
        var departure_date = $(this).val();
        var days = parseInt($("#region option:selected").attr("days"));
        $("#curier").attr("disabled", "").remo;
        $("#curier :first").attr("selected", "selected");
        
        if (departure_date) {
            var date = new Date(departure_date);
            date.setDate(date.getDate() + days);
            var newDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            $("#arrival_date").val(newDate);
        } else {
            $("#arrival_date").val("");
        }
        
        arrival_date = $("#arrival_date").val();

        //разблокируем выбор курьера и подгружаем список незанятых курьеров
        if (arrival_date) {
            $("#curier").removeAttr("disabled");

            $.ajax({
                url: '/components/getCouriersAjax.php',
                type: 'post',
                data: {
                    departure_date: departure_date,
                    arrival_date: arrival_date
                },
                success: function (response) {
                    if (response) {
                        var arr = $.parseJSON(response);
                        var str = "<option disable>Выберите курьера</option>";
                        for (var i = 0; i < arr.length; i++) {
                            str += "<option value='" + arr[i]['id'] + "'>" + arr[i]['surname'] + " " + arr[i]['first_name'] + " " + arr[i]['second_name'] + "</option>";
                            
                            $("#curier").empty().append(str);
                        }
                    } else {
                        alert("Нет свободных курьеров на эти даты");
                    }
                },
                error() {
                    alert("Произошла ошибка");
                }

            });

        } else {
            $("#curier").attr("disabled", "");
            $("#curier :first").attr("selected", "selected");
        }

    });

    //отправить курьера
    $("input[name='addTrip']").on('click', function (e) {
        e.preventDefault();
        var curier = $("#curier").val();
        var region = $("#region").val();
        var departure_date = $("#departure_date").val();
        var arrival_date = $("#arrival_date").val();

        if (curier !== "" && region !== "" && departure_date !== "" && arrival_date !== "") {

            $.ajax({
                url: '/components/addTripAjax.php',
                type: 'post',
                data: {
                    curier: curier,
                    region: region,
                    departure_date: departure_date,
                    arrival_date: arrival_date
                },
                success: function (response) {
                    if (parseInt(response)) {
                        alert("Курьер отправлен");
                        var curier = $("#curier").val("");
                        var region = $("#region").val("");
                        var departure_date = $("#departure_date").val("");
                        var arrival_date = $("#arrival_date").val("");
                    } else {
                        alert("Ничего не вышло");
                    }
                },
                error() {
                    alert("Произошла ошибка при отправке формы");
                }

            });

        } else {
            alert("Заполните, пожалуйста, все поля");
        }

    });

});
