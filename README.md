# Социальная сеть "Society"
Приложение было разработано в рамках курсовой работы по дисциплине "Разработка серверных частей интернет-ресурсов".
## Функционал
Были реализованы следующие функции:
+ Регистрация и авторизация
+ Редактирование профиля
+ Создание публикаций и возможность ставить лайки
+ Концепция подписок
+ Добавлений изображений и файлов к публикациям
## Демонстрация


https://github.com/RRifen/society/assets/56244600/f6bd8226-620b-43b8-aed9-20b806e4ccdd


## Технологический стек
Серверная часть:
+ Spring
  + Spring Web
  + Spring Data JPA
  + Spring Security
  + Spring Validation
+ Lombok
+ Gradle
+ JJWT API

Слой базы данных:
+ PostgreSQL
+ Flyway

Клиентская часть:
+ React
+ Bootstrap
+ Axios
+ HTML, CSS, JS

Deploy:
+ Docker
+ Docker Compose

## Как запсутить
``` shell
git clone https://github.com/RRifen/society.git
cd society
docker-compose up
```
