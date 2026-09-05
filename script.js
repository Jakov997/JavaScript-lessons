let title = prompt("Введите название проекта");
let screens = prompt("Введите типы экранов через запятую");
let screenPrice;
let screenPriceInput;
let adaptive = confirm("Будет ли адаптивная верстка? ");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Введите стоимость дополнительной услуги 1");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Введите стоимость дополнительной услуги 2");
let rollback = 7;

let lowCase = screens.toLowerCase().split(", ");

if (adaptive) {
  console.log("Адаптивная верстка необходима");
} else {
  console.log("Адаптивная верстка не нужна");
}

do {
  screenPriceInput = prompt("Введите стоимость данной работы");
  screenPrice = Number(screenPriceInput);
} while (
  screenPriceInput === null ||
  screenPriceInput.trim() === "" ||
  !Number.isFinite(screenPrice)
);

let getAllServicePrices = function (a, b) {
  let price1 = Number(a);
  let price2 = Number(b);

  if (
    a === null ||
    b === null ||
    a.trim() === "" ||
    b.trim() === "" ||
    !Number.isFinite(price1) ||
    !Number.isFinite(price2)
  ) {
    return 0;
  }

  return price1 + price2;
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

const counterPotatoes = function (potatoes) {
  for (let i = 0; i < potatoes.length; i++) {
    console.log(`Картошка №${i + 1} почищена!`);
  }
};

counterPotatoes([1, 2, 3, 4, 5]);

console.log(`Название проекта: ${title}`);
console.log(discount(fullPrice));
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(typeof allServicePrices + " -Это тип переменной allServicePrices");
console.log(`Сумма всех дополнительных услуг: ${allServicePrices} рублей`);
console.log(
  `Стоимость верстки и всех дополнительных услуг: ${fullPrice} рублей`,
);
console.log(`Стоимость с учетом отката: ${Math.ceil(servicePercentPrices)}`);

console.log(lowCase);
