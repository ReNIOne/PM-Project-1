const months = {
    '01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'августа',
    '09': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря',
}

//Сортировка айтемов
let NEW = [],
    RECOMMENDED = [],
    SALE = [];

let char;
for (char of ITEMS){
    if (char.hasOwnProperty('img') === false){
        char.img = 'images/no_photo.jpg';
    }
    if (char.type === 'new'){
        NEW.push(char);
    }
    if (char.type === 'recommended'){
        if (char.hasOwnProperty('price') === false){
            char.price = '0';
        }
        if (char.hasOwnProperty('oldPrice') === false){
            char.oldPrice = '0';
        }
        RECOMMENDED.push(char);
    }
    if (char.type === 'sale'){
        if (char.hasOwnProperty('price') === false){
            char.price = 0;
        }
        if (char.hasOwnProperty('oldPrice') === false){
            char.oldPrice = 0;
        }
        SALE.push(char);
    }
}

//Смена валюты
for (char of ITEMS){
    if (CURRENCY !== char.currency){
        char.price = String(Math.floor(Number(char.price) * CURRENCY_EXCHANGE[char.currency]));
        char.oldPrice = String(Math.floor(Number(char.oldPrice) * CURRENCY_EXCHANGE[char.currency]));
        char.currency = CURRENCY;
    }
}

//Добавление заглушки
for (char of PROMOTIONS){
    if (char.hasOwnProperty('img') === false){
        char.img = 'images/promo_plug.jpg'
    }
}

for (char of BUYING_RIGHT_NOW){
    if (char.hasOwnProperty('img') === false){
        char.img = 'images/no_photo.jpg'
    }
}

//Сортировка
BANNER.sort(function (a,b){
    return a.order-b.order
})

for (char of SALE){
    char.price_diff = Number(char.oldPrice) - Number(char.price)
}

NEW.sort(function(a, b){
    let dateA = new Date(a.date), dateB = new Date(b.date);
    return dateA-dateB
})

RECOMMENDED.sort(function (a, b){
    return a.price-b.price
})

SALE.sort(function (a, b){
    return b.price_diff-a.price_diff
})

MENU.sort(function (a,b){
    return a.order-b.order
})

//Добавление суммы в корзину
let items = document.querySelector("#items"),
    value = document.querySelector("#value"),
    currency = document.querySelector("#currency")

if (BASKET.length === 0){
    items.appendChild(document.createTextNode('0'));
    value.appendChild(document.createTextNode('0'));
    currency.appendChild(document.createTextNode(CURRENCY));
}
else{
    items.appendChild(document.createTextNode(BASKET.elements));
    items.setAttribute('data-items', BASKET.elements)
    value.appendChild(document.createTextNode(BASKET.price));
    value.setAttribute('data-value', (BASKET.price));
    currency.appendChild(document.createTextNode(CURRENCY));
}

//Добавление айтемов в верхнее меню
if (Object.keys(TOP_MENU).length === 0){
    let menu = document.querySelector('.menu__wrapper')
    menu.remove()
}else {
    menu_ul = document.querySelector('#menu');
    for (char of Object.keys(TOP_MENU)){
        let curr_obj = TOP_MENU[char];
        if (curr_obj.hasOwnProperty('submenu') === false){
            let menu_ul_li = document.createElement('li'),
                menu_ul_li_a = document.createElement('a');
            menu_ul_li_a.setAttribute('href', curr_obj.url);
            menu_ul_li_a.appendChild(document.createTextNode(curr_obj.title))
            menu_ul_li.appendChild(menu_ul_li_a);
            menu_ul.appendChild(menu_ul_li);
        }else{
            let menu_ul_li = document.createElement('li'),
                sub_menu = document.createElement('ul');
            menu_ul_li.appendChild(document.createTextNode(curr_obj.title  + ' ▾'))
            let submenu;
            for (submenu of curr_obj.submenu){
                let sub_menu_li = document.createElement('li'),
                    sub_menu_li_a = document.createElement('a');
                sub_menu_li_a.setAttribute('href', submenu.url);
                sub_menu_li_a.appendChild(document.createTextNode(submenu.title));
                sub_menu_li.appendChild(sub_menu_li_a);
                sub_menu.appendChild(sub_menu_li);
                sub_menu.setAttribute('class', 'submenu')
                menu_ul_li.appendChild(sub_menu);
            }
            menu_ul.appendChild(menu_ul_li);
        }
    }
}


//Добавление айтемов в оранжевое меню
if (MENU.length === 0){
    let products = document.querySelector('.products');
    products.remove();
    }
else{
    let products = document.querySelector('.products');
    for (char of MENU){
        let title = document.createTextNode(char.title);
        let link = document.createElement('a');
        let product_type = document.createElement('div');
        product_type.setAttribute('class', 'products__category');
        link.setAttribute('href',char.url);
        link.appendChild(title);
        product_type.appendChild(link);
        products.appendChild(product_type);
    }
}

//Добавление новостей
if (NEWS.length === 0){
    let section = document.querySelector('.news-and-slider');
    let new_items = document.querySelector('.news-section');
    section.style.display = "block";
    new_items.remove();
}
else if(NEWS.length <= 3){
    let new_items = document.querySelector('.news-list'),
        all_news = document.querySelector('.all-news-link'),
        new_string = '';
    all_news.remove();
    for (char of NEWS){
        let item_string = `<li class="news-preview">
                    <a href="#"><img class="news-img" src=${char.img} alt="news icon">
                        <div class="news-date">
                            <p class="date-num">${char.date.substring(9, 10)}</p>
                            <p>${months[char.date.substring(5, 7)]}</p>
                        </div></a>
                    <div class="news-text">
                        <a href="#" class="news-title">${char.title}</a>
                        <p class="news-article">${char.description}</p>
                    </div>
                </li>`
        new_string += item_string
    }
    new_items.innerHTML = new_string;
}
else{
    let list = [],
        new_items = document.querySelector('.news-list'),
        new_string = '';
    for (let i = 0; i < 3; i++){
        let ind = Math.floor(Math.random() * NEWS.length);
        list.push(NEWS[ind]);
        NEWS.splice(ind, 1);
    }
    for (char of list){
        let item_string = `<li class="news-preview">
                    <a href="#"><img class="news-img" src=${char.img} alt="news icon">
                        <div class="news-date">
                            <p class="date-num">${char.date.substring(9, 10)}</p>
                            <p>${months[char.date.substring(5, 7)]}</p>
                        </div></a>
                    <div class="news-text">
                        <a href="#" class="news-title">${char.title}</a>
                        <p class="news-article">${char.description}</p>
                    </div>
                </li>`
        new_string += item_string
    }
    new_items.innerHTML = new_string;
    console.log(list);
}

//Большой слайдер
if (BANNER.length === 0){
    let new_items = document.querySelector('.news-and-slider__right__slider')
    new_items.remove();
}else{
    for (char of BANNER){
        let slide = document.createElement('div'),
            slides = document.querySelector('.news-and-slider__right__slides'),
            button = document.createElement('button'),
            b = document.createElement('b');
        button.setAttribute('class', 'news-and-slider__right__slider__more')
        b.appendChild(document.createTextNode('ПОДРОБНЕЕ'));
        button.appendChild(b);
        slide.setAttribute('class', 'slide');
        slide.style.background = `url(${char.img})`;
        slide.appendChild(button);
        slides.appendChild(slide);
    }
}

//Добавление айтемов в поля "Новинки" "Рекомендуем" "Распродажа"
if (NEW.length === 0){
    let new_items = document.querySelector('.products-list-new')
    new_items.remove();
}
else{
    let new_items = document.querySelector('.products-list-new__items'),
        new_string = ``;
    for (char of NEW){
        if (char.hasOwnProperty('price') === true){
            let item_string = `<div class="products-list__items__wrap">
                    <img src="images/products_new.jpg" alt="new label" class="product-label">
                    <div class="products-list__items__wrap__image"><a href="#"><img src=${char.img} alt="some item"></a></div>
                    <p><a href=${char.url}>${char.description}</a></p>
                    <p class="price">Цена:<span class="big-numbers"><b> ${char.price} ${char.currency}</b></span><span class="old-price"> ${char.oldPrice} ${char.currency}</span></p>
                    <p>
                        <button class="buy-button" data-price=${char.price}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495.4 495.4" width="512" height="512" class="svg replaced-svg"><path d="M185 381.5c-22.9 0-41.4 18.5-41.4 41.4 0 22.9 18.5 41.4 41.4 41.4 22.8 0 41.4-18.5 41.4-41.4C226.4 400 207.9 381.5 185 381.5z"></path><path d="M365.6 381.5c-22.9 0-41.4 18.5-41.4 41.4 0 22.9 18.5 41.4 41.4 41.4 22.8 0 41.4-18.5 41.4-41.4C407 400 388.5 381.5 365.6 381.5z" class="a"></path><path d="M469.6 154.7l-229.2 0c-11.5 0-20.7 9.3-20.7 20.8s9.3 20.8 20.8 20.8l202.8 0 -12.9 43.5 -206.2 0c-10.6 0-19.2 8.6-19.2 19.3 0 10.6 8.6 19.3 19.3 19.3l194.8 0.1 -12.1 40.7H174.5L159 196.2 144.3 76.5c-1.2-9.5-8.1-17.3-17.3-19.6l-98-25C16.6 28.7 3.9 36.2 0.7 48.6s4.3 25.1 16.8 28.3l82.7 21.1 32.2 241.6c0 0 1.1 28.2 26.7 28.2h256.8c21.5 0 25.7-22.4 25.7-22.4l50.9-151.2C492.4 194.2 507.5 154.7 469.6 154.7z"></path></svg>
                            <b>КУПИТЬ</b>
                        </button>
                        <a href=${char.url} class="more">Подробнее</a>
                    </p>
                </div>`
            new_string += item_string;
        }else{
            let item_string = `<div class="products-list__items__wrap">
                    <img src="images/products_new.jpg" alt="new label" class="product-label">
                    <div class="products-list__items__wrap__image"><a href="#"><img src=${char.img} alt="some item"></a></div>
                    <p><a href=${char.url}>${char.description}</a></p>
                    <p class="price"><span class="big-numbers"><b>Товар временно не доступен</b></span><span class="old-price"></span></p>
                    <p>
                        <a href=${char.url} class="more">Подробнее</a>
                    </p>
                </div>`
            new_string += item_string;
        }
    }
    new_items.innerHTML = new_string;
}

let new_string;
if (RECOMMENDED.length === 0) {
    let new_items = document.querySelector('.products-list-recommended')
    new_items.remove();
} else {
    new_items = document.querySelector('.products-list-recommended__items');
    new_string = `  `;
    for (char of RECOMMENDED) {
        if (char.price !== '0') {
            let item_string = `<div class="products-list__items__wrap">
                    <img src="images/products_recommended.jpg" alt="recommended label" class="product-label">
                    <div class="products-list__items__wrap__image"><a href="#"><img src=${char.img} alt="some item"></a></div>
                    <p><a href=${char.url}>${char.description}</a></p>
                    <p class="price">Цена:<span class="big-numbers"><b> ${char.price} ${char.currency}</b></span><span class="old-price"> ${char.oldPrice} ${char.currency}</span></p>
                    <p>
                        <button class="buy-button" data-price=${char.price}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495.4 495.4" width="512" height="512" class="svg replaced-svg"><path d="M185 381.5c-22.9 0-41.4 18.5-41.4 41.4 0 22.9 18.5 41.4 41.4 41.4 22.8 0 41.4-18.5 41.4-41.4C226.4 400 207.9 381.5 185 381.5z"></path><path d="M365.6 381.5c-22.9 0-41.4 18.5-41.4 41.4 0 22.9 18.5 41.4 41.4 41.4 22.8 0 41.4-18.5 41.4-41.4C407 400 388.5 381.5 365.6 381.5z" class="a"></path><path d="M469.6 154.7l-229.2 0c-11.5 0-20.7 9.3-20.7 20.8s9.3 20.8 20.8 20.8l202.8 0 -12.9 43.5 -206.2 0c-10.6 0-19.2 8.6-19.2 19.3 0 10.6 8.6 19.3 19.3 19.3l194.8 0.1 -12.1 40.7H174.5L159 196.2 144.3 76.5c-1.2-9.5-8.1-17.3-17.3-19.6l-98-25C16.6 28.7 3.9 36.2 0.7 48.6s4.3 25.1 16.8 28.3l82.7 21.1 32.2 241.6c0 0 1.1 28.2 26.7 28.2h256.8c21.5 0 25.7-22.4 25.7-22.4l50.9-151.2C492.4 194.2 507.5 154.7 469.6 154.7z"></path></svg>
                            <b>КУПИТЬ</b>
                        </button>
                        <a href=${char.url} class="more">Подробнее</a>
                    </p>
                </div>`
            new_string += item_string;
        } else {
            let item_string = `<div class="products-list__items__wrap">
                    <img src="images/products_recommended.jpg" alt="recommended label" class="product-label">
                    <div class="products-list__items__wrap__image"><a href="#"><img src=${char.img} alt="some item"></a></div>
                    <p><a href=${char.url}>${char.description}</a></p>
                    <p class="price"><span class="big-numbers"><b>Товар временно не доступен</b></span><span class="old-price"></span></p>
                    <p>
                        <a href=${char.url} class="more">Подробнее</a>
                    </p>
                </div>`
            new_string += item_string;
        }
    }
    new_items.innerHTML = new_string;
}

if (SALE.length === 0){
    let new_items = document.querySelector('.products-list-sale')
    new_items.remove();
}
else{
    new_items = document.querySelector('.products-list-sale__items');
    new_string = ``;
    for (char of SALE){
        if (char.price !== '0'){
            let item_string = `<div class="products-list__items__wrap">
                <img src="images/products_sale.jpg" alt="new label" class="product-label">
                <div class="products-list__items__wrap__image"><a href="#"><img src=${char.img} alt="some item"></a></div>
                <p><a href=${char.url}>${char.description}</a></p>
                <p class="price">Цена:<span class="big-numbers"><b> ${char.price} ${char.currency}</b></span><span class="old-price"> ${char.oldPrice} ${char.currency}</span></p>
                <p>
                    <button class="buy-button" data-price=${char.price}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495.4 495.4" width="512" height="512" class="svg replaced-svg"><path d="M185 381.5c-22.9 0-41.4 18.5-41.4 41.4 0 22.9 18.5 41.4 41.4 41.4 22.8 0 41.4-18.5 41.4-41.4C226.4 400 207.9 381.5 185 381.5z"></path><path d="M365.6 381.5c-22.9 0-41.4 18.5-41.4 41.4 0 22.9 18.5 41.4 41.4 41.4 22.8 0 41.4-18.5 41.4-41.4C407 400 388.5 381.5 365.6 381.5z" class="a"></path><path d="M469.6 154.7l-229.2 0c-11.5 0-20.7 9.3-20.7 20.8s9.3 20.8 20.8 20.8l202.8 0 -12.9 43.5 -206.2 0c-10.6 0-19.2 8.6-19.2 19.3 0 10.6 8.6 19.3 19.3 19.3l194.8 0.1 -12.1 40.7H174.5L159 196.2 144.3 76.5c-1.2-9.5-8.1-17.3-17.3-19.6l-98-25C16.6 28.7 3.9 36.2 0.7 48.6s4.3 25.1 16.8 28.3l82.7 21.1 32.2 241.6c0 0 1.1 28.2 26.7 28.2h256.8c21.5 0 25.7-22.4 25.7-22.4l50.9-151.2C492.4 194.2 507.5 154.7 469.6 154.7z"></path></svg>
                        <b>КУПИТЬ</b>
                    </button>
                    <a href=${char.url} class="more">Подробнее</a>
                </p>
            </div>`
            new_string += item_string;
        }
        else{
            let item_string = `<div class="products-list__items__wrap">
                    <img src="images/products_sale.jpg" alt="sale label" class="product-label">
                    <div class="products-list__items__wrap__image"><a href="#"><img src=${char.img} alt="some item"></a></div>
                    <p><a href=${char.url}>${char.description}</a></p>
                    <p class="price"><span class="big-numbers"><b>Товар временно не доступен</b></span><span class="old-price"></span></p>
                    <p>
                        <a href=${char.url} class="more">Подробнее</a>
                    </p>
                </div>`
            new_string += item_string;
        }
    }
    new_items.innerHTML = new_string;
}

//Добавление айтемов "Что покупают сейчас"
if (BUYING_RIGHT_NOW.length === 0){
    let new_items = document.querySelector('.buying')
    new_items.remove();
}
else{
    new_items = document.querySelector('.buying__items');
    new_string = '';
    for (char of BUYING_RIGHT_NOW){
        let item_string = `<div class="buying__items__wrap">
                <div class="buying__items__wrap__image"><a href=${char.url}><img src=${char.img} alt="some item"></a></div>
                <p><a href=${char.url}>${char.title}</a></p>
            </div>`
        new_string += item_string;
    }
    new_items.innerHTML = new_string;
}

//Добавление акций
let digit;
if (PROMOTIONS.length === 0) {
    let new_items = document.querySelector('.promos');
    new_items.remove();
} else {
    let new_items = document.querySelector('.promosWrapper'),
        new_string = ``;
    for (char of PROMOTIONS) {
        if (char.hasOwnProperty('time_action') === false) {
            let item_string = `<div class="promoWrapper">
                <a class="promoName" href=${char.url}>${char.title}</a>
                <img src=${char.img} alt="promo pic">
                <p class="promoDescription">
                    ${char.description}
                </p>
                
                <div class="timerBlock">
                    <p>Срок действия:</p>
                    <p class="infinite">БЕССРОЧНО</p>
                </div>
                <a href="#">Подробнее</a>
            </div>`
            new_string += item_string;
        } else {
            let reg_numbers = /\d{1,2}/gmi,
                numbers = char.time_action.match(reg_numbers),
                new_numbers = '';
            for (digit of numbers) {
                if (digit.length === 1) {
                    digit = '0' + digit;
                }
                new_numbers += digit
            }
            let item_string = `<div class="promoWrapper">
                <a class="promoName" href=${char.url}>Название акции</a>
                <img src=${char.img} alt="promo pic">
                <p class="promoDescription">${char.description}</p>
                <div class="timerBlock">
                    <p>Срок действия:</p>
                    <div class="timer">
                        <div class="timerDigits">
                            <p class="timerDigit">${new_numbers[0]}</p>
                            <p class="timerDigit">${new_numbers[1]}</p>
                            <p>:</p>
                            <p class="timerDigit">${new_numbers[2]}</p>
                            <p class="timerDigit">${new_numbers[3]}</p>
                            <p>:</p>
                            <p class="timerDigit">${new_numbers[4]}</p>
                            <p class="timerDigit">${new_numbers[5]}</p>
                        </div>
                        <div class="timerLabel">
                            <p>дней</p>
                            <p>часов</p>
                            <p>минут</p>
                        </div>
                    </div>
                </div>
                <a href="#">Подробнее</a>
            </div>`
            new_string += item_string;
        }
    }
    new_items.innerHTML = new_string;
}

//Делаем кнопку купить рабочей
let buttons = document.querySelectorAll('.buy-button');
for (char of buttons){
    let curr = char;
    char.addEventListener('click', function (){
        let sum = document.querySelector('#value'),
            amount = document.querySelector('#items'),
            curr_sum_value = document.querySelector('#value').getAttribute('data-value'),
            curr_amount_value = document.querySelector('#items').getAttribute('data-items'),
            price = curr.getAttribute('data-price');
        curr_sum_value = String(Number(curr_sum_value) + Number(price));
        curr_amount_value = String(Number(curr_amount_value) + 1);
        sum.setAttribute('data-value', curr_sum_value);
        amount.setAttribute('data-items', curr_amount_value);
        sum.innerHTML = curr_sum_value;
        amount.innerHTML = curr_amount_value;
    })
}