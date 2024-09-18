let tasks = [];

let input = document.querySelector(".task--input");
let tasks_list = document.querySelector(".tasks__list--wrap");

function createTasks(props) {
    tasks_list.innerHTML = "";
    let is_done_tasks = tasks.some(task=>task.status == true);
    if(is_done_tasks) {
        //create button
    }

    for(let i = 0; i< props.length; i++) {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        let span = document.createElement("span");

        let img_wrap = document.createElement("div");
        img_wrap.classList.add("task__icon--wrap")

        let delete_icon = document.createElement("img");
        delete_icon.src = "./images/delete-icon.png";

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(img_wrap);
        li.classList.add("task__item");

        if(props[i].status === true) {
            li.classList.add("checked");
            checkbox.checked = true
        }else {
            let edit_icon = document.createElement("img");
            edit_icon.src = "./images/edit-icon.png";
            img_wrap.appendChild(edit_icon);
        }
        img_wrap.appendChild(delete_icon);

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

  //если текст не влез. то сократить точками