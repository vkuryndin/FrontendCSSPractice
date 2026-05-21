# YouTalk Blog

Статическая адаптивная верстка двух страниц по макету YouTalk. Сессионное задание по предмету Основы frontend-разработки.

Для удобной демонстрации сверстанный сайт доступен на: http://18.185.7.63:8082/index.html.

Для автоматической проверки используются:

- HTMLHint — проверка HTML;
- Stylelint — проверка CSS;
- Prettier — проверка форматирования.


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

### Полная структура проекта

```
├── index.html              # Главная страница блога
├── article.html            # Страница статьи
├── css/
│   ├── normalize.css       # CSS reset
│   ├── style.css           # Основные стили
│   └── responsive.css      # Адаптивные стили
├── js/
│   └── main.js             # Логика мобильного меню и интерактивных элементов
├── assets/
│   ├── icons/              # SVG/PNG-иконки (добавлены две PNG иконки в связи с проблемами с экспортом из Figma)
│   └── images/             # Изображения страниц
├── package.json            # npm-скрипты и dev-зависимости
├── package-lock.json       # Зафиксированные версии npm-зависимостей
├── .htmlhintrc             # Настройки HTMLHint
└── .stylelintrc.json       # Настройки Stylelint
```


## Docker

Проект можно запустить в Docker. Для раздачи статических файлов используется Nginx.

В проекте есть готовые Docker-файлы:

- `Dockerfile` — собирает образ на базе `nginx:1.27-alpine`;
- `nginx.conf` — конфигурация Nginx для раздачи сайта;
- `docker-compose.yml` — запуск контейнера на порту `8082`;
- `.dockerignore` — исключает служебные файлы из Docker-сборки.

Запуск через Docker Compose:

```bash
docker compose up -d --build
```

После запуска сайт будет доступен по адресу:

```bash
http://localhost:8082
```

такой был выбран, так как на моем сервере уже есть nginx на другом порту.

Остановка контейнера:

```bash
docker compose down
```
