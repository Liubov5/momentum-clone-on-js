let tasks = [];

let input = document.querySelector(".task--input");
let tasks_list = document.querySelector(".tasks__list--wrap");

function createTask(arg) {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let span = document.createElement("span");
    li.appendChild(checkbox);
    li.appendChild(span);
    li.classList.add("task__item")
    span.textContent = arg;
    tasks_list.appendChild(li);
    var id = "id" + Math.random().toString(16).slice(2);
    let task = {
        id:id,
        text:arg,
        status:false,
    }
    tasks.push(task);
    console.log(tasks)
    li.addEventListener("click", handleClick.bind(task));
    li.setAttribute('data-id',task.id);
}

input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        let value = this.value;
        value = value.trim();
        if(value.length != 0 ){
            createTask(value);
            this.value = "";
        }
        else{
            console.log("пустое поле!");
        }       
    }
  });

  function handleClick(arg){
    console.log(this, arg)
    this.classList.add("checked");
    this.firstChild.checked = true;
  }