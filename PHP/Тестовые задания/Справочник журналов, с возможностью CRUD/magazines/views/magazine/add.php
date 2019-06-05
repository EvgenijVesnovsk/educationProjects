<?php require_once(ROOT . '/views/layout/header.php'); ?>

<section>
    <div class="form_addmagazine">
        <label for="name">Название журнала: </label><input id="name" type="text" name="name" placeholder="Название журнала"><br />
        <label>Описание журнала: <input type="text" name="description" placeholder="Описание журнала"></label><br />
        <label>Добавить картинку: <input type="file" name="img"></label><br />
        <label for="authors">Авторы: </label><br/>
        <select id="authors" size="5" multiple name="authors[]">
            <option selected disabled>Выберите автора</option>
            <?php foreach($authors as $author) { ?>
            <option value="<?= $author['id']; ?>">
                <?= "{$author['surname']} {$author['first_name']} {$author['second_name']}"; ?>
            </option>
            <?php } ?>
        </select>
        <br />
        <input type="button" name="goMagazine" method="add" value="Добавить запись">
    </div>
</section>

<?php require_once(ROOT . '/views/layout/footer.php'); ?>
