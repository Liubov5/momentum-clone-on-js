let tasks = [];

let input = document.querySelector(".task--input");
let tasks_list = document.querySelector(".tasks__list--wrap");
let tasks__btn__delete = document.querySelector(".tasks__btn--delete");

tasks__btn__delete.addEventListener("click", handleDeleteAllDoneTaskClick);

function createTasks(props) {
    tasks_list.innerHTML = "";

    let is_done_tasks = tasks.some(task=>task.status == true);
    is_done_tasks === true ?  tasks__btn__delete.classList.add("visible") : tasks__btn__delete.classList.remove("visible");
   
    //отрисовка задач
    for(let i = 0; i< props.length; i++) {
        let li = document.createElement("li");
        li.classList.add("task__item");
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        let span = document.createElement("span");

        let delete_icon = document.createElement("img");
        delete_icon.src = "./images/delete-icon.png";

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delete_icon);
        

        if(props[i].status === true) {
            li.classList.add("checked");
            checkbox.checked = true
        }
        
        span.textContent = props[i].text;
        tasks_list.appendChild(li);
        
        li.setAttribute('data-id', props[i].id);
        li.addEventListener("click", handleClick);
        delete_icon.addEventListener("click", (event)=>handleDeleteClick(props[i].id, event))
    }
}

input.addEventListener('keyup', function(e) {
   
    if (e.keyCode === 13) {
        let value = this.value;
        value = value.trim();
        if(value.length != 0 ){
            var id = "id" + Math.random().toString(16).slice(2);
            let task = {
                id:id,
                text: value,
                status:false,
            }
            tasks.push(task);
            createTasks(tasks)
            this.value = "";
        }
        else{
            console.log("пустое поле!");
        }       
    }
});
  
function handleClick(e){
    e.stopPropagation();
    let id = this.getAttribute("data-id");
    let task = tasks.find(i => i.id === id);
    task.status === false ? this.classList.add("checked") : this.classList.remove("checked")
    task.status = !task.status;   
    this.firstChild.checked = task.status;
    createTasks(tasks);
    //удалить возможность редактировать после нажатия на чекбокс
    //change(task, this, this.firstChild);
   
}

function handleDeleteClick(id, e){
    e.stopPropagation();
    let index = tasks.findIndex((t) => t.id === id);
    tasks.splice(index,1);
    createTasks(tasks)
}

function handleDeleteAllDoneTaskClick(e){
    tasks = tasks.filter(t=>t.status !== true);
    console.log(tasks)
    createTasks(tasks)
}


 