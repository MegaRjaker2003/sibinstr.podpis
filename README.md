# Сайт для автоматизации создания индивидуальныйх почтовых подписей

## Содержание
- [Технологии](#технологии)
- [Использование](#использование)
- [Разработка](#разработка)
- [Тестирование](#тестирование)
- [Deploy и CI/CD](#deploy-и-ci/cd)
- [Contributing](#contributing)
- [Разработчик](#разработчик)

## Технологии
- [Vite](https://vitejs.dev/guide/)
- [React](https://react.dev)
- [ClipboardJs](https://clipboardjs.com)

## Использование
Установите проект на свой пк командой:
```sh
$ git clone https://github.com/MegaRjaker2003/sibinstr.podpis.git
```

Установите необходимые зависимости:
```sh
npm i
```

После устанвки запустите проект в режиме разработки:
```sh
npm run dev
```

Готово,сайт будет доступен по домену http://localhost:5173

## Разработка

### Требования
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v8+.

### Установка зависимостей
Проект создан с помощью базового шаблона vite@react:
```sh
npm create vite@latest react
```
После чего установлены основные пакеты:
```sh
npm i
```
Также была локально установлена библиотека clipboard.js (файл clipboard.min.js)

После данных действий можно перейти непосредственно к написанию кода

### Запуск Development сервера
Чтобы запустить сервер для разработки, выполните команду:
```sh
npm run dev
```

### Написание кода

В данном блоке будут обьяснение выбранных решений

Первым делом было удалено все лишнее из файла App.js,после чего были подключены основные модули:
```js
import { useEffect, useState } from 'react'
import {defStyle,podpisStyle,fioStyle,linkStyle,imageStyle} from './style'
import base64 from './base64'
import "./style.css"
```
Пояснение:
- первая строка:импортирование необходимых функций из react
- вторая строка:импортирование внутренних стилей для блока подписи
- третья строка: импортирование логотипа в base64 формате
- четвертая строка: импортирование стилей

Далее определены основные состояния приложения:
```js
const [fio,setFio] = useState('') 
const [dolzn,setDolzn] = useState('')
const [address,setAddress] = useState('664040, г. Иркутск, ул. Розы Люксембург, 182/2')
const [workPhone,setWorkPhone] = useState('')
const [dopPhone,setDopPhone] = useState('')
const [sotPhone,setSotPhone] = useState('')
const [mail,setMail] = useState('')
const [text,setText] = useState('')
const [images,setImages] = useState([])
```

После этого идет функция useEffect с настройками:
- маски ввода рабочего телефона
- маски ввода сотового телефона
- кнопки копирования подписи

```js
useEffect(()=> {
maskPhone("#phone_work","+7 (____) ___-___")
maskPhone("#phone_sot","+7 ___ ___-__-__")
document.getElementById("copy").addEventListener("click", e => {e.preventDefault();e.target.setAttribute("data-clipboard-text", document.getElementById("result").innerHTML)})
new ClipboardJS('.copy')
})
```

Функция маски телефона выглядит следующим образом:
```js
function maskPhone(selector, masked = '+7 (___) ___-__-__') {
const elem = document.querySelector(selector);
function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
    def = template.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, "");
    let i = 0,
        newValue = template.replace(/[_\d]/g, (a) => i < val.length ? val.charAt(i++) || def.charAt(i) : a);
    i = newValue.indexOf("_");
    if (i !== -1) newValue = newValue.slice(0, i);
    let reg = template.substr(0, this.value.length).replace(/_+/g,(a) => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
    if (event.type === "blur" && this.value.length < 5) this.value = "";
    }
    ['input','focus','blur'].map(event => elem.addEventListener(event,mask))
}
```

После этого идет основная react верстка

Подробно ее структуру можно посмотреть в файле App.js после return

Файл style.js хранит стили которые далее будут импортированы в теги подписи,он выглядит следующим образом:
```js
export let defStyle = {
    margin:"5px 0",
    padding:0,
}

export let podpisStyle = {
    margin:"20px",
    fontFamily:"Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
    fontSise:"17px",
    fontWeight:400,
}

export let fioStyle = {
    fontSise:"17px",
    fontWeight:"bold",
}

export let linkStyle = {
    display:"block",
    marginBottom:"20px",
    width:"320px",
    marginTop:"10px",
}

export let imageStyle = {
    display:"block",
    margin:"10px 0",
    boxShadow:"7px 7px 5px rgba(0,0,0,0.6)",
    maxWidth:"100%",
}
```

Само подключение стилей к блокам выглядит вот так:
```js
style={defStyle}
```

### Создание билда
Чтобы выполнить production сборку, выполните команду: 
```sh
npm run build
```
Все файлы сайта будут доступны в папке build

## Тестирование
Проект покрыт юнит-тестами Jest. Для их запуска выполните команду:
```sh
npm run test
```

Для тестирования так же можете запустить приложение командой:
```sh
npm run dev
```

## Deploy и CI/CD
Чтобы развернуть приложение на хостинг необходимо для начала сделать сборку командой:
```sh
npm build
```
После чего файлы полученные в папке build загрузить на любой хостинг

## Contributing
Если вы будучи работником компании хотите предложить доработки,то вы можете сделать одно из следующих действий:
- свяжитесь со мной в битрикс24 или соц.сетях
- через битрикс24 поставьте задачу на it отдел
- свяжитесь с системный администратором и изложите ему свои предложения

## FAQ 
Основные вопросы:

Как изменить логотип? 
Как поменять местами блоки в подписи?
Как убрать ненужный блок в подписи?

Никак, это одно из требований руководителя it отдела компании, подписи должны иметь одну структуру для каждого члена компании (исключение:необязательные поля).

Если есть вопросы по эксплуатации читайте инструкцию в базе знаний предприятия

### Зачем этот проект нужен?

В компании где я работаю, существует актуальная проблема - создание индивидуальной подписи для вновь пришедших сотрудников, и т.к весь прогресс в мире движется к автоматизации рутинных процессов, я решил автоматизировать и этот процесс, путем создания сайта с формами для заполнения информацией которую нужно отобразить в индивидуальной подписи(телефон, должность, адрес филиала и т.п)


## Разработчик
- [Богдан Звягинцев](tg://resolve?domain=bzvyagintsev) — Front-End Engineer
