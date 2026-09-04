let title = prompt("Введите название проекта");
let screens = prompt("Введите типы экранов через запятую");
let screenPrice = Number(prompt("Введите стоимость данной работы"));
let rollback = 7;
let adaptive = confirm("Будет ли адаптивная верстка? ");
if (adaptive) {
  console.log("Адаптивная верстка необходима");
} else {
  console.log("Адаптивная верстка не нужна");
}

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = Number(prompt("Введите стоимость дополнительной услуги 1"));
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = Number(prompt("Введите стоимость дополнительной услуги 2"));

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let percent = fullPrice * (rollback / 100);
let servicePercentPrice = fullPrice - percent;
console.log(`Стоимость с учетом отката: ${Math.ceil(servicePercentPrice)}`);

if (fullPrice > 30000) {
    console.log("Даем скидку в 10%");
} else if ( fullPrice > 15000 && fullPrice <= 30000) {
    console.log("Даем скидку в 5%");
}  else if ( fullPrice > 0 && fullPrice <= 15000) {
    console.log("Скидка не предусмотрена");
} else if (fullPrice <= 0) {
    console.log("Что то пошло не так");
}


console.log(title + "\n" + fullPrice + "\n" + adaptive);
console.log(screens.split(", ").length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
let lowCase = screens.toLowerCase().split(", ");
console.log(lowCase);

