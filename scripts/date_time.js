

let hour_elem = document.querySelector(".time__text--hour");
let minutes_elem = document.querySelector(".time__text--minutes");
let seconds_elem = document.querySelector(".time__text--seconds");
let hour;
let minutes;
let seconds;
let date;
setTimeout(timer , 1000);

function timer() {
    date = new Date();
    hour = date.getHours(); 
    minutes = date.getMinutes(); 
    seconds = date.getSeconds(); 
    
    hour_elem.innerHTML = hour;
    minutes_elem.innerHTML = minutes;
    seconds_elem.innerHTML = seconds;
    setTimeout(timer, 1000);
}

