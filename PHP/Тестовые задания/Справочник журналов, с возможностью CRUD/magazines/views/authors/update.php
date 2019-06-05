<?php require_once(ROOT . '/views/layout/header.php'); ?>

<section>
    <div class="form_updateAuthor" data-id="<?= $author['id']; ?>">
        <label for="first_name">Имя: </label><input id="first_name" type="text" name="first_name" value="<?= $author['first_name']; ?>" placeholder="Имя автора"><br />
        <label for="surname">Фамилия: </label><input id="surname" type="text" name="surname" value="<?= $author['surname']; ?>" placeholder="Фамилия автора"><br />
        <label>Отчество: <input type="text" name="second_name" value="<?= $author['second_name']; ?>" placeholder="Отчество автора"></label><br />
        <input type="button" name="goAuthor" method="update" value="Редактировать автора">
    </div>
</section>

<?php require_once(ROOT . '/views/layout/footer.php'); ?>
