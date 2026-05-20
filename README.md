# YouTalk Blog

Статическая адаптивная верстка двух страниц по макету YouTalk. Сессионное задание по предмету Основы frontend-разработки.

Для удобной демонстрации сверстанный сайт доступен на: http://18.185.7.63:8082/index.html.

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