<?php require_once(ROOT . '/views/layout/header.php'); ?>

<section>
    <div class="form_updatemagazine" data-id="<?= $magazine['id']; ?>">
        <label for="name">Название журнала: </label><input id="name" type="text" name="name" value="<?= $magazine['name']; ?>" placeholder="Название журнала"><br/>
        <label>Описание журнала: <input type="text" name="description" value="<?= $magazine['description']; ?>" placeholder="Описание журнала"></label><br/>
        
        <img src="<?= $magazine['img']; ?>" alt="<?= $magazine['name']; ?>"><br/>

        <label>Изменить картинку: <input type="file" name="img"></label><br/>

        <label for="authors">Авторы: </label><br/>
        
           <select id="authors" size="5" multiple name="authors[]">
            <option disabled>Выберите автора</option>
            <?php foreach($authors as $author) { ?>
            <option 
                <?php foreach($magazineAuthors as $magAut) {
                        if ($author['id'] == $magAut) echo "selected";
                      } 
                ?>
                value="<?= $author['id']; ?>"
            ><?= "{$author['surname']} {$author['first_name']} {$author['second_name']}"; ?>
            </option>
            <?php } ?>
        </select>
        <br />
        
        <input type="button" name="goMagazine" method="update" value="Редактировать запись">
    </div>
</section>

<?php require_once(ROOT . '/views/layout/footer.php'); ?>
