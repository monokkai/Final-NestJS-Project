Данный проект во всей красе представляет лучший фреймвок для работы с бэкендом - NestJS всвязке с Docker, кучей полезных библиотек.
Проект развивается и вскором времени будет иметь свой front написаный на React для лучшего UX.

Описание структуры проекта, основные компоненты и их работа:

1. Структура папок:

   - users-service - сервис пользователей, сгенерированных faker (для остальных сервисов).
   - products-service - сервис продуктов, сгенерированных faker (для остальных сервисов).
   - orders-service - сервис заказов с отзывами клиентов для повышения рентабельности.
   - chat-service - позволяет получить по ключевому слову название и информацию о продукте во всей базе данных.
   - api-gateway-service - связующее звено, которое соединяет Users, Products, Orders в одну цельную машину.
   - security-service - сервис, написанный на NodeJS представляет из себя этап валидации пользователя.
   - reviews-service - сервис отзывов клиентов товарам.

2. Основные компоненты и библиотеки:

   - Swagger - документация проекта для других программистов.
   - class-validator - библиотека для сортировки значений и их валидации в DB.
   - faker - генерация по параметрам разных типов сущностей.
   - MongoDB - мощная DB для работы с NestJS, более легковесная и легко настраиваемая.
   - MariaDB - более тяжелая DB, но такая же актуальная и практичная.
   - NGINX - заменен на API GATEWAY, но начальная структура микросервисов построена на нем.
   - Winston - профессиональная библиотека для логирования в файл и консоль.
   - CASL - ограничение прав пользователя, его роли.
   - Axios - отправка HTTP запросов.

3. Основные маршруты:

   1. Users:

      - http://localhost:3000/users/api - GET информация о всем сервисе для программистов.
      - http://localhost:3000/users/searchall - GET вывод всех пользователей.
      - http://localhost:3000/users/searchid=:id - GET вывод user'a по ID.
      - http://localhost:3000/users/new - POST создание нового user'a.
      - http://localhost:3000/users/news - POST создание новых user'ов.
      - http://localhost:3000/users/update=:id - PATCH обновление user'a по ID.
      - http://localhost:3000/users/remove=:id - DELETE удаление user'а по ID.

   2. Products:

      - http://localhost:3000/products/api - GET информация о всем сервисе для программистов.
      - http://localhost:3000/products/new - POST создание нового товара.
      - http://localhost:3000/products/searchall - GET вывод всех товаров.
      - http://localhost:3000/products/search - GET вывод товара по keyWord(специальный метод для chat-service).
      - http://localhost:3000/products/search=:id - GET поиск продукта по ID.
      - http://localhost:3000/products/update=:id - PATCH обновление товара по ID.
      - http://localhost:3000/products/remove=:id - DELETE удаление проекта по ID.

   3. Orders:

      - http://localhost:3000/orders - GET получение всех заказов.
      - http://localhost:3000/orders - POST создание нового заказа.
      - http://localhost:3000/orders/:userId - GET получение заказов конкретного пользователя.
      - http://localhost:3000/orders/:orderId - PATCH обновление заказа по ID.
      - http://localhost:3000/orders/:orderId - DELETE удаление заказа по ID.

   4. Chat:

      - http://api-gateway-service:3000/products/searchall?searchWord=${payload}
        То есть, если использовать postman для проверки данного маршрута, то:

      1. Идем в postman, подключаем Socket.IO.
      2. http://localhost:3004/chat.
      3. В Message: {"searchWord": "Стул"}.
      4. В Events: searchProduct add --> LISTEN(on).
      5. Запрос в В Message: {"searchWord": "Стул"} и ответ придет JSON форматом товара.

   5. API-Gateway(AGW):

      - http://localhost:3000/users
      - http://localhost:3000/products
      - http://localhost:3000/orders

      * Эти сервисы хостятся на AGW, то есть AGW стал заменой NGINX для более удобного подхода и объединения по сути всех 3 сервисов.

   6. Reviews:

      - http://localhost:3000/reviews - GET получение всех отзывов.
      - http://localhost:3000/reviews - POST создание нового отзыва.
      - http://localhost:3000/reviews/product/:id - GET получение отзывов для конкретного продукта.
      - http://localhost:3000/reviews/:id - GET получение отзыва по ID.
      - http://localhost:3000/reviews/:id - PUT обновление отзыва по ID.
      - http://localhost:3000/reviews/:id - DELETE удаление отзыва по ID.

   7. Security:
   
      - http://localhost:3000/auth/register - POST регистрация нового пользователя.
      - http://localhost:3000/auth/login - POST авторизация пользователя.
      - http://localhost:3000/auth/profile - GET получение профиля пользователя (требуется токен).
      - http://localhost:3000/auth/refresh - POST обновление токена доступа.
