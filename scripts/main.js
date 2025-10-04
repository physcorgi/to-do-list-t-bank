const todoItems = new Map();
let id = 0;

function submit(event) {
    event.preventDefault();

    const item = document.querySelector("#input");
    const value = item.value.trim();

    if (!value) return;

    todoItems.set(id++, {
        value,
        isDone: false
    });

    printItems(todoItems);
    item.value = "";
    console.log(todoItems);
}

function printItems(todoItems) {
    const container = document.querySelector("#todo-list");
    container.innerHTML = "";

    todoItems.forEach((todo, id) => {
        renderItem(container, [id, todo]);
    });
}

function renderItem(list, [id, { value, isDone }]) {
    const li = document.createElement("li");
    li.setAttribute("id", id);


    const span = document.createElement("span");
    span.textContent = value;
    if (isDone) {
        span.style.textDecoration = "line-through";
        li.classList.add("done");
    }

    const editButton = document.createElement("button");
    editButton.textContent = "✏️ Редактировать";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", () => {
        const newValue = prompt("Введите новое значение:", value);
        if (newValue) {
            todoItems.set(id, { value: newValue, isDone });
            printItems(todoItems);
        }
    });


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌ Удалить";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
        todoItems.delete(id);
        printItems(todoItems);
    });


    const doneButton = document.createElement("button");
    doneButton.textContent = isDone ? "↩ Отменить" : "✅ Готово";
    doneButton.classList.add("done-btn");
    doneButton.addEventListener("click", () => {
        todoItems.set(id, { value, isDone: !isDone });
        printItems(todoItems);
    });


    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    li.appendChild(doneButton);
    list.appendChild(li);
}


const form = document.querySelector("#form");
form.addEventListener("submit", submit);
