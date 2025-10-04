const todoitems = new Map();

let id = 0;

function submit(event) {
    event.preventDefault();
    const item = document.querySelector('#input');
    const value = item.value;
    todoitems.set(id++, {
        value,
        isDone: false,
    });
    printItems(todoitems);
}

function printItems(todoitems) {
    let list = document.querySelector('#todo-list');
    if (!list) {
        list = document.createElement('ul');
        list.id = 'list';
        document.body.appendChild(list);
    }
    list.innerHTML = "";
    for (const entry of todoitems.entries()) {
        renderItem(list, entry);
    }
}


function renderItem(printcontainer, [id, { value, isDone }]) {
    const item = document.createElement('li');
    item.innerText = value;
    printcontainer.appendChild(item);
}

const form = document.querySelector('#form');
form.addEventListener('submit', submit);
