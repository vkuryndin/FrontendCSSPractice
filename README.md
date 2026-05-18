# YouTalk Blog

Статическая адаптивная верстка по макету YouTalk.

## Страницы

- `index.html` — страница блога
- `article.html` — страница статьи

## Технологии

- HTML5
- CSS3
- CSS Grid
- Flexbox
- Media queries
- БЭМ
- Accessibility
- JavaScript для мобильного меню

## Структура

```text
assets/images/ — PNG-картинки
assets/icons/  — SVG-иконки
css/           — стили проекта
js/            — скрипт мобильного меню
```

## Проверка перед сдачей

- открыть `index.html` и `article.html` в браузере;
- проверить адаптив через DevTools на 1440, 1024, 768, 414 и 320 px;
- убедиться, что нет горизонтального скролла;
- проверить, что бургер-меню открывается и закрывается;
- проверить, что первая карточка блога ведет на `article.html`.

## Иконки футера

Для замены placeholder-иконок экспортируйте элементы из Figma и положите файлы по этим путям:

- `assets/icons/footer-sk-logo.svg` — логотип/бейдж SK «Участник» в футере;
- `assets/icons/social-vk.svg` — иконка VK;
- `assets/icons/social-telegram.svg` — иконка Telegram;
- `assets/icons/social-twitter.svg` — иконка Twitter;
- `assets/icons/social-dzen.svg` — иконка Дзен.

Файл `assets/icons/logo.svg` — основной логотип в header, его не заменять без необходимости.
