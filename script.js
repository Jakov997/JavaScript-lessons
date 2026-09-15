let btn = document.getElementById('btn');
let colors = document.querySelector('#text');
let colorForSquare;
let square = document.getElementById('square');
let circle = document.getElementById('circle');
let btnSquare = document.getElementById('e_btn');
let range = document.getElementById('range');
let randeTxt = document.getElementById('range-span');




/* btn.addEventListener('click', function(event) {
    
    if (btn.style.backgroundColor === 'blue') {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    } else {
        btn.style.backgroundColor = 'blue';
        btn.style.color = 'white';
    }
}); */

colors.addEventListener('input', function(event) {
    colorForSquare = colors.value;

});

btn.addEventListener('click', function(event) {
    square.style.backgroundColor = colorForSquare;
});

range.addEventListener('input', function(event) {
    circle.style.width = Math.floor(range.value) + '%';
    circle.style.height = Math.floor(range.value) + '%';
    randeTxt.textContent = Math.floor(range.value) + '%';
});

btnSquare.style.display = 'none';



