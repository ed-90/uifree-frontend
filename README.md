# UIfree Frontend 🎨

Фронтенд для библиотеки бесплатных UI-компонентов, сгенерированных искусственным интеллектом Grok.

## 🌟 Особенности

- **React + Vite** — современный и быстрый стек
- **Тёмная/светлая тема** — с переключением через контекст
- **Infinite scroll** — компоненты подгружаются автоматически
- **Shadow DOM** — изоляция CSS каждого компонента
- **Адаптивный дизайн** — работает на всех устройствах
- **SEO-оптимизирован** — sitemap, мета-теги, robots.txt

## 📦 Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/ed-90/uifree-frontend.git

# Перейти в папку
cd uifree-frontend

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Собрать для продакшена
npm run build
🛠 Технологии
React 19

Vite 8

React Router DOM 7

Axios

Lucide React (иконки)

React Intersection Observer (infinite scroll)

📁 Структура проекта
text
src/
├── components/     # Переиспользуемые компоненты
├── pages/          # Страницы (Home, About, Component)
├── api/            # Запросы к бэкенду
├── context/        # Контекст темы
├── styles/         # Глобальные стили
└── utils/          # Вспомогательные функции
🔗 API
Фронтенд общается с бэкендом по адресу https://uifree.ru/api.
Документация API доступна на сайте.

📄 Лицензия
MIT — свободно используйте в любых проектах.

📡 API Эндпоинты
Метод	Путь	Описание
GET	/api/components	Список компонентов (с пагинацией)
GET	/api/components/:id	Конкретный компонент
GET	/api/components/count	Количество компонентов
GET	/api/components/categories/list	Список категорий
⏰ Автоматическая генерация
Каждую ночь в 3:00 запускается cron-задача, которая:

Запрашивает у Grok API 10 новых компонентов

Сохраняет их в базу данных

Обновляет sitemap

🛠 Технологии
Node.js + Express

PostgreSQL

node-cron

Axios

🌐 Ссылки
Сайт: https://uifree.ru