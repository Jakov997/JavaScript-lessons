const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  screenPriceInput: 0,
  adaptive: true,
  service1: "",
  servicePrice1: 0,
  service2: "",
  servicePrice2: 0,
  rollback: 7,

  asking() {
    appData.title =
      prompt("Введите название проекта", "Рекламный лендинг") ?? "";
    appData.screens =
      prompt(
        "Введите типы экранов через запятую",
        "Десктоп, Мобильный и тд",
      ) ?? "";

    do {
      appData.screenPriceInput = prompt("Введите стоимость данной работы");
      appData.screenPrice = Number(appData.screenPriceInput);
    } while (
      appData.screenPriceInput === null ||
      appData.screenPriceInput.trim() === "" ||
      !Number.isFinite(appData.screenPrice)
    );

    appData.adaptive = confirm("Будет ли адаптивная верстка?");
    appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
    appData.servicePrice1 = prompt("Введите стоимость дополнительной услуги 1");
    appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
    appData.servicePrice2 = prompt("Введите стоимость дополнительной услуги 2");
  },

  getAllServicePrices() {
    const price1 = Number(appData.servicePrice1);
    const price2 = Number(appData.servicePrice2);

    if (
      appData.servicePrice1 === null ||
      appData.servicePrice2 === null ||
      appData.servicePrice1.trim() === "" ||
      appData.servicePrice2.trim() === "" ||
      !Number.isFinite(price1) ||
      !Number.isFinite(price2)
    ) {
      return 0;
    }

    return price1 + price2;
  },

  getFullPrice() {
    return appData.screenPrice + appData.getAllServicePrices();
  },

  getTitle() {
    const clearTitle = this.title.trim();

    if (clearTitle === "") {
      return "";
    }

    return clearTitle[0].toUpperCase() + clearTitle.slice(1).toLowerCase();
  },

  getServicePercentPrices() {
    const percent = appData.getFullPrice() * (appData.rollback / 100);
    return Math.ceil(appData.getFullPrice() - percent);
  },

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

  logger() {
    for (const key in this) {
      if (typeof this[key] === "function") {
        console.log(`${key}: метод`);
      } else {
        console.log(`${key}:`, this[key]);
      }
    }

    console.log(`Название проекта: ${appData.title}`);
    console.log(appData.discount(appData.getFullPrice()));
    console.log(`Стоимость верстки экранов ${appData.screenPrice} рублей`);
    console.log(
      `Сумма всех дополнительных услуг: ${appData.getAllServicePrices()} рублей`,
    );
    console.log(
      `Стоимость верстки и всех дополнительных услуг: ${appData.getFullPrice()} рублей`,
    );
    console.log(
      `Стоимость с учетом отката: ${appData.getServicePercentPrices()} рублей`,
    );
    console.log(appData.lowCase);
  },

  start() {
    appData.asking();
    appData.title = appData.getTitle();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrices = appData.getServicePercentPrices();
    appData.lowCase = appData.screens.toLowerCase().split(", ");
    appData.logger();
  },
};

appData.start();
