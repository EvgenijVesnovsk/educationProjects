<?php require_once("components/getData.php"); ?>

<?php require_once("header.php"); ?>

<form action="addTrip">
    <label for="region">Регион: <select name="region" id="region">
        <option value="0">Выберите регион</option>
        <?php foreach($regions as $region) { ?>
        <option value="<?= $region['id']; ?>" days="<?= $region['count_days']; ?>"><?= $region['name']; ?></option>
        <?php } ?>
    </select></label><br/><br/>
    <label for="departure_date">Дата отправления: <input type="date" name="departure_date" id="departure_date" disabled></label><br/><br/>
    <label for="arrival_date">Дата прибытия: <input type="date" name="arrival_date" id="arrival_date" disabled></label><br/><br/>
        <label for="curier">Курьер: <select name="curier" id="curier" disabled>
        <option disable>Выберите курьера</option>
    </select></label><br/><br/>
    <input type="submit" name="addTrip" value="Отправить">   
</form>

<?php require_once("footer.php"); ?>
