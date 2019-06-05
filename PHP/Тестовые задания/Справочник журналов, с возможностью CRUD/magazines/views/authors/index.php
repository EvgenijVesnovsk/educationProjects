<?php require_once(ROOT . '/views/layout/header.php'); ?>

<!-- выводим список авторов -->
<section>
<?php if (isset($authors)) { 
    foreach($authors as $author) {
?>
<div class="author_block" data-id="<?= $author['id']; ?>">
    <a href="/authors/update/<?= $author['id']; ?>" class="updateAuthor">Редактировать</a>
    <a class="deleteAuthor">Удалить</a>
    <p>
        <a href="/authors/<?= $author['id']; ?>"><?php echo "{$author['surname']} {$author['first_name']} {$author['second_name']}"; ?></a>
    </p>
</div>
<?php } ?>
<div class="pagination">
    <?php for($i=1; $i <= $pageCount; $i++) { ?>
    <a href="/authors/<?= $i; ?>"><?= $i; ?></a>
    <?php } ?>
</div>
<?php } ?>


<!-- выводим автора по идентификатору -->
<?php if (isset($authorById)) { ?>

    <p>Фамилия: <?= $authorById['surname']; ?></p>
    <p>Имя: <?= $authorById['first_name']; ?></p>
    <?php if ($authorById['second_name']) { ?>
        <p>Отчество: <?= $authorById['second_name']; ?></p>
    <?php }
        if (!empty($magazinesListByAuthor)) { ?>
        <h3>Список журналов, где есть автор:</h3>         
    <?php }
        foreach($magazinesListByAuthor as $magazine) { ?>
            <!-- заглушка в ссылке для будующего перехода на страницу журнала по id -->
            <a href="/"><?= $magazine['name'];?></a>
        <?php }
 } ?>

</section>

<?php require_once(ROOT . '/views/layout/footer.php'); ?>