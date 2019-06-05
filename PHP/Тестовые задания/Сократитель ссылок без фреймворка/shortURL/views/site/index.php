<?php require_once("views/layouts/header.php"); ?>
   
<form action="/controllers/SiteController.php">
    <input type="text" name="url" id="url" placeholder="Введите URL">
    <input type="submit" name="getUrl" id="getUrl" value="Получить короткий URL">
</form>

<div id="shortUrl"></div>

<?php require_once("views/layouts/footer.php"); ?>