
const time = new Date();
const current_time = time.getHours();
console.log(current_time)
if(current_time >= 0 && current_time < 6) {
    document.body.style.backgroundImage = "url(./images/01.jpg)"
}else if(current_time >=6 && current_time < 12){
    document.body.style.backgroundImage = "url(./images/02.jpg)"
}
else if(current_time >=12 && current_time < 18) {
    document.body.style.backgroundImage = "url(./images/03.jpg)"
}else if(current_time >= 18 && current_time <= 23) {
    console.log("lol")
    document.body.style.backgroundImage = "url(./images/04.jpg)"
}
