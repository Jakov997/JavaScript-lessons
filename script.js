let title = prompt("Введите название проекта");
let screens = prompt("Введите типы экранов через запятую");
let screenPrice = Number(prompt("Введите стоимость данной работы"));
let adaptive = confirm("Будет ли адаптивная верстка? ");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = Number(prompt("Введите стоимость дополнительной услуги 1"));
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = Number(prompt("Введите стоимость дополнительной услуги 2"));
let rollback = 7;

let lowCase = screens.toLowerCase().split(", ");

if (adaptive) {
  console.log("Адаптивная верстка необходима");
} else {
  console.log("Адаптивная верстка не нужна");
}

let getAllServicePrices = function (a, b) {
  return a + b;
};
let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice() {
  return screenPrice + allServicePrices;
}

let fullPrice = getFullPrice();

let percent = fullPrice * (rollback / 100);

let discount = function (price) {
  if (price > 30000) {
    return "Даем скидку в 10%";
  } else if (price > 15000 && price <= 30000) {
    return "Даем скидку в 5%";
  } else if (price > 0 && price <= 15000) {
    return "Скидка не предусмотрена";
  } else if (price <= 0) {
    return "Что то пошло не так";
  }
};

function getTitle(title) {
  let clearTitle = title.trim();
  if (clearTitle === "") {
    return "";
  }
  return clearTitle[0].toUpperCase() + clearTitle.slice(1).toLowerCase();
}

title = getTitle(title);

function getServicePercentPrices() {
  return fullPrice - percent;
}

let servicePercentPrices = getServicePercentPrices();

console.log(`Название проекта: ${title}`);
console.log(discount(fullPrice));
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Сумма всех дополнительных услуг: ${allServicePrices} рублей`);
console.log(
  `Стоимость верстки и всех дополнительных услуг: ${fullPrice} рублей`,
);
console.log(`Стоимость с учетом отката: ${Math.ceil(servicePercentPrices)}`);


console.log(lowCase);
