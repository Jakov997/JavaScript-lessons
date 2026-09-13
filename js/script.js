const title1 = document.getElementsByTagName("h1")[0];
console.log(title1);

let btns = document.getElementsByClassName('handler_btn');

let screenBtn = document.querySelector('.screen-btn');

let itemsWithPercent = document.querySelectorAll('.other-items.percent');
console.log(itemsWithPercent);

let itemsWithNumber = document.querySelectorAll('.other-items.number');
console.log(itemsWithNumber);

let range = document.querySelector('.rollback input[type="range"]');

let rangeValue = document.querySelector('.rollback .range-value');
console.log(`${range.value}\n ${rangeValue.textContent}`);

let options = document.getElementsByClassName('total-input');
for(let option of options) {
    console.log(option);
}
/* console.log(...options); */

let screens = document.querySelector('.screen');
console.log(screens);

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  screenPriceInput: 0,
  adaptive: true,
  services: {},
  servicePrice1: 0,
  servicePrice2: 0,
  rollback: 7,

  start() {
    appData.asking();
    appData.addPrices();
    appData.getTitle();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.transformTxt();
    appData.logger();
  },

  transformTxt() {
    appData.lowCase = appData.screens.map((item) => item.name.toLowerCase());
  },

  isText(value) {
    if (value === null || value === undefined) return false;
    const str = String(value).trim();
    return str !== "" && !/^\d+$/.test(str);
  },

  isNumber(value) {
    if (value === null || value === undefined) return false;
    return value !== "" && !isNaN(Number(value));
  },

  asking() {
    // Заголовок проекта
    appData.title = "";
    do {
      appData.title = prompt("Введите название проекта", "Рекламный лендинг");
    } while (!appData.isText(appData.title));

    // Типы экранов
    for (let i = 1; i <= 2; i++) {
      let name = "";
      do {
        name = prompt(
          "Введите типы экранов через запятую",
          "Десктоп, Мобильный и тд",
        );
      } while (!appData.isText(name));

      let price = 0;
      do {
        price = prompt("Введите стоимость данной работы");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: +price });
    }

    // Дополнительные услуги
    for (let i = 1; i <= 2; i++) {
      let serviceName = "";
      do {
        serviceName = prompt(`Какой дополнительный тип услуги нужен?`);
      } while (!appData.isText(serviceName));

      let servicePrice = 0;
      do {
        servicePrice = prompt(`Введите стоимость дополнительной услуги ${i}`);
      } while (!appData.isNumber(servicePrice));

      appData.services[serviceName] = Number(servicePrice);
    }

    // Адаптивная верстка
    appData.adaptive = confirm("Будет ли адаптивная верстка?");
  },

  // Функция для подсчета цен на экраны и услуги
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(
      (sum, screen) => sum + screen.price,
      0,
    );

    appData.allServicePrices = 0;
    for (const key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  // Функция для получения полной стоимости проекта
  getFullPrice() {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    return appData.fullPrice;
  },

  // Функция для получения названия проекта с первой заглавной буквой
  getTitle() {
    const clearTitle = this.title.trim();

    if (clearTitle === "") {
      return "";
    }

    appData.title =
      clearTitle[0].toUpperCase() + clearTitle.slice(1).toLowerCase();
  },

  // Функция для получения стоимости услуг с учетом процента отката
  getServicePercentPrices() {
    const percent = appData.getFullPrice() * (appData.rollback / 100);
    appData.servicePercentPrices = Math.ceil(appData.getFullPrice() - percent);
  },

  // Функция для получения информации о скидке с ветвлением
  discount(price) {
    if (price > 30000) {
      return "Даем скидку в 10%";
    }

    if (price > 15000) {
      return "Даем скидку в 5%";
    }

    if (price > 0) {
      return "Скидка не предусмотрена";
    }

    return "Что то пошло не так";
  },

  // Функция для логирования всей информации о проекте
  logger() {
    for (const key in this) {
      if (typeof this[key] === "function") {
        console.log(`${key}: метод`);
      } else {
        console.log(`${key}:`, this[key]);
      }
    }

    console.log(`Название проекта: ${appData.title}`);
    console.log(appData.discount(appData.fullPrice));
    console.log(`Стоимость верстки экранов: ${appData.screenPrice} рублей`);
    console.log(
      `Сумма всех дополнительных услуг: ${appData.allServicePrices} рублей`,
    );
    console.log(
      `Стоимость верстки и всех дополнительных услуг: ${appData.fullPrice} рублей`,
    );
    console.log(
      `Стоимость с учетом отката: ${appData.servicePercentPrices} рублей`,
    );
    console.log(`Типы экранов: ${appData.lowCase}`);
  },
};

appData.start();
