const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const todoContainer = document.querySelector(".todo-container");
const todoRemove = document.querySelector(".todo-remove");

const todoData = function(){
    return JSON.parse(localStorage.getItem("todos")) || localStorage.setItem("todos", JSON.stringify([]));
}

const renderTodo = function(){
    const todos = todoData();
    todoList.innerHTML = ``;
    todoCompleted.innerHTML = ``;
    todos.forEach((item, i) => {
        const newItem = `
            <li class="todo-item" data-id="${i}">
                <span class="text-todo">${item.title}</span>
                <div class="todo-buttons">
                    <button class="todo-remove"></button>
                    <button class="todo-complete"></button>
                </div>
            </li>
        `;
        if (item.status){
            completed.insertAdjacentHTML('beforeend', newItem);
        } else {
            todoList.insertAdjacentHTML('beforeend', newItem);
        }
    });
};

const addTodo = function(event){
    const todos = todoData();
    todos.push({
        title: headerInput.value,
        status: false
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodo();
    event.target.reset();
}

const deleteTodo = function(id){
    const todos = todoData();
    todos.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodo();
}

const changeStatus = function(id){
    const todos = todoData();
    todos.forEach((item, i) => {
        if (i === id){
            item.status = !item.status;
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodo();
};
const todos = todoData();
renderTodo();
todoContainer.addEventListener("click", function(e){
    todoData();
    const target = e.target;
    if(target.matches(".todo-remove")){
        deleteTodo(+target.closest("li").dataset.id);
    }
    if(target.matches(".todo-complete")){
        changeStatus(+target.closest("li").dataset.id);
    }
});

todoControl.addEventListener("submit", function(e){
    e.preventDefault();
    if (headerInput.value.length <= 0){
        alert("Введите задачу!");
    } else{
        addTodo(e);
    }
});