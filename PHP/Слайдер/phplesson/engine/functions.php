<?php

//Константы ошибок
define('ERROR_NOT_FOUND', 1);
define('ERROR_TEMPLATE_EMPTY', 2);

/*
* Обрабатывает указанный шаблон, подставляя нужные переменные
*/
function render($file, $variables = [])
{
    if (!is_file($file)) {
        echo 'Template file "' . $file . '" not found';
        exit(ERROR_NOT_FOUND);
    }

    if (filesize($file) === 0) {
        echo 'Template file "' . $file . '" is empty';
        exit(ERROR_TEMPLATE_EMPTY);
    }

    // если переменных для подстановки не указано, просто
    // возвращаем шаблон как есть
    if (empty($variables)) {
        $templateContent = file_get_contents($file);
    } else {
        $templateContent = file_get_contents($file);
        foreach ($variables as $key => $value) {
            if ($value != null) {
                // собираем ключи
                $key = '{{' . strtoupper($key) . '}}';

                // заменяем ключи на значения в теле шаблона
                $templateContent = str_replace($key, $value, $templateContent);
            }
        }
		//генерируем и подставляем галерею
//		$templateContent = str_replace('{{GALLERY}}', makeGallery(WWW_ROOT . IMG_DIR), $templateContent);
		$templateContent = str_replace('{{GALLERY}}', makeGallery(), $templateContent);
    }
    return $templateContent;
}

function makeGallery() {
	
	$images = getImages();
	
	foreach ($images as $image) {
		if(is_file($image['url'])) {
			$result[] = $image;
		};
	};
	
	function maxViews ($arr, $str) {
		$count = count($arr);
		for ($i = 0; $i < $count; $i++) {
			for($j = 0; $j < $count; $j++) {
				// ищем максимальное кол-во просмотров
				if ($arr[$i]['views'] >= $arr[$j]['views']) {
					//сравнение последнего значения
					if ($j == $count - 1) {
						$str .= "<img class='small' src='" . $arr[$i]['url'] ."' alt='" . $arr[$i]['name'] . "' views='" . $arr[$i]['views'] . "'>";
						//создаем новый массив без максимального значения
						for ($h = 0; $h < $count; $h++) {
							if ($h !== $i) {
								$newArray[] = $arr[$h];		
							};
						};
						//если есть хоть одно значение - запускаем рекурсию
						if (!empty($newArray)) {
							return maxViews($newArray, $str);
						};
					} else {
						continue;
					};
				} else {
					break;
				};	
			};
		};
		return $str;		
	};

	$str = '';
	return maxViews($result, $str);
};
?>