let time_elem = document.querySelector(".time__text");
let date_elem = document.querySelector(".date__text");


timer();
function timer() {
    let time = new Date();
    let time_local = time.toLocaleTimeString();
    time_elem.textContent = time_local
    setTimeout(timer, 1000);
}

let date = new Date();
const options = {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
};
let date_local = date.toLocaleDateString('ru-RU', options);
date_elem.textContent = date_local;

//1. сделать красоту 2. чтобы таймер появлялся сразу  без задержки. но без потворяющегося textcontent