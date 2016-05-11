# Концепция интерфейса денежных переводов для рабочего места оператора (2015)

Требования к вёрстке:
* IE7+
* Минимум библиотек с "костылями" и polyfills для IE
* jQuery, Knockout
* Максимальная скорость работы! "Тормоза" не допустимы!

Требования к интерфейсу:
* В дизайне лёгкость и простота, ничего лишнего
* Понятность и очевидность для операционного состава банков
* Полное управление с клавиатуры (вообще без указателя мыши), включая "горячие" клавиши
* Радио и чекбоксы имеют свой дизайн (с закруглениями)
* Элементы ввода в фокусе д.б. визуально отмечены

Сначала рассматривался готовый CSS Framework http://aozora.github.io/bootplus/ (основан на Bootstrap 2.3.x)
Но пришлось написать своё решение, т.к. интерфейс имеет много специфики.

IE6 не подерживается, пользователю будет показано соответствующее сообщение!

В режиме разработки под IE7 тестировать нужно в IE >= 9 в режиме эмуляции IE7.
Финальное тестирование нужно делать в чистой среде - Windows Vista & IE7 on Virtual Box.
См. http://jira.lukrep:8090/pages/viewpage.action?pageId=622757
Т.к. режим эмуляции IE7 не на 100% соответствует поведению IE7 в чистой среде!

Синтаксис условных комментариев в IE:
http://htmlbook.ru/samlayout/internet-explorer/uslovnye-kommentarii

Условные комментарии в IE > 9 уже не работают!
См. https://msdn.microsoft.com/ru-ru/library/ie/hh801214(v=vs.85).aspx

IE8 имеет свои особенности и ошибки.
Чтобы не писать CSS правила для ещё одного браузера, заставляем IE8 работать в режиме эмуляции IE7!
Ещё IE8 не поддерживает в CSS `expression()`, через который можно исправить ошибки IE7 и сделать поддержку новых CSS свойств.

ВНИМАНИЕ!
При сборе статистики по использованию браузеров нужно внимательно смотреть,
что присылает IE8 в режиме эмуляции IE7 в заголовке `HTTP_USER_AGENT`.
Можно, например, ориентироваться на версию движка Trident
и/или использовать классы типа `$('html').is('.ie8')` и `$('html').is('.ie7')`

Последовательность перечисления CSS/JS файлов имеет значение!
Каждый файл должен быть закеширован на 9 лет HTTP заголовками (нужно настроить веб-сервер).
В этом случае при повторной загрузке страницы браузер не будет делать запрос на сервер.
Каждый файл должен иметь номер версии, например `font-awesome.css?v=4.2.0`
В случае обновления файла меняется номер версии и браузер вынужден сделать запрос на сервер (только 1 раз).

Все CSS файлы ниже на боевом сервере нужно склеить в 1 файл и минифицировать.
Конечный файл тоже должен иметь версию, например: `main.min.css?v=1.0`

Для загрузки CSS файлов используется тег `<link>`, а не инструкция @import.
Так браузеры загружают много CSS файлов параллельно и быстрее. См. http://habrahabr.ru/post/57012/
Так же в IE < 9 существует ошибка -- максимум @import в одном файле 31 шт, остальные игнорируются.

https://code.google.com/p/ie7-js/ -- DEPRECATED! Эксперимент показал, что эта поделка парсит CSS и тормозит. Не использовать!
