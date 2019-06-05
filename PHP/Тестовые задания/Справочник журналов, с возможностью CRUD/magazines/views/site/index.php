<?php require_once(ROOT . '/views/layout/header.php'); ?>

<section>
   <?php foreach($magazines as $magazine) { ?>
    <div class="magazine_block" data-id="<?= $magazine['id']; ?>">
        <h2><?= $magazine['name']; ?></h2>
        <a href="/magazine/update/<?= $magazine['id']; ?>" class="updateMagazine">Редактировать</a>
        <a class="deleteMagazine">Удалить</a>
        <br/>
        <img src="<?= $magazine['img']; ?>" alt="<?= $magazine['name']; ?>">
        <br/>
        <span><?= $magazine['create_at']; ?></span>
        <p><?= $magazine['description']; ?></p>
        <p><?php $str = $magazine['authors'];
                 $arr = explode(",", $str);
                 foreach($arr as $id) { ?>
                    <a href="/authors/<?= $id; ?>"><?php
                    foreach($authors as $author) {
                        if($author['id'] == $id) echo "{$author['surname']} {$author['first_name']}";
                    }
                        ?></a>
                <?php }                            
            ?>
        </p>       
    </div>
    <?php } ?>
    <div class="pagination">
    <?php for($i=1; $i <= $pageCount; $i++) { ?>
        <a href="/<?= $i; ?>"><?= $i; ?></a>
    <?php } ?>
    </div>
</section>

<?php require_once(ROOT . '/views/layout/footer.php'); ?>