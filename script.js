let title;
title = "My project about JavaScript";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1500;
let rollback = 7;
let fullPrice = 50000;
let adaptive = true;

console.log(title + "\n" + fullPrice + "\n" + adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
 let lowCase = screens.toLowerCase().split(', ');
console.log(lowCase);
let percent = (fullPrice*(rollback/100));
console.log(percent);