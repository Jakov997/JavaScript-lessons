const booksContainer = document.querySelector('.books');
let books = document.querySelectorAll('.book');
let listItems2 = books[0].querySelectorAll('ul li ');
let listItems5 = books[5].querySelectorAll('ul li ');
let listItems6 = books[2].querySelectorAll('ul li ');
let adv = document.querySelector('.adv');

// for(let book of books) {
//     console.log(`book ${Array.prototype.indexOf.call(books, book)}: ${book}`);
// }

booksContainer.prepend(books[1]);
booksContainer.append(books[2]);
books[4].after(books[3]);  
listItems2[3].after(listItems2[6], listItems2[8]);
listItems2[9].after(listItems2[2]);

listItems5[4].after(listItems5[2]);
listItems5[3].before(listItems5[9]);
listItems5[8].before(listItems5[5]);

listItems6[8].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');


document.body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";

books[4].querySelector('h2 > a').textContent = "Книга 3. this и Прототипы Объектов";

console.log(books[1]);
adv.remove();

console.log(listItems6);