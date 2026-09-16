//todo-control
// header-input
// header-button
// todo-list
// todo-completed

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const headerButton = document.querySelector(".header-button");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const defaultTodoData = [
  {
    text: "Сварить кофе",
    completed: false,
  },
  {
    text: "Помыть посуду",
    completed: true,
  },
];

const savedData = localStorage.getItem("todoData");

const todoData = savedData ? JSON.parse(savedData) : defaultTodoData;

const saveData = function () {
  localStorage.setItem("todoData", JSON.stringify(todoData));
};

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  todoData.forEach(function (item) {
    const li = document.createElement("li");

    li.classList.add("todo-item");
    li.innerHTML =
      `<span class="text-todo">${item.text}</span>` +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.appendChild(li);
    } else {
      todoList.appendChild(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      saveData();
      render();
    });

    li.querySelector(".todo-remove").addEventListener("click", function () {
      const itemIndex = todoData.indexOf(item);
      todoData.splice(itemIndex, 1);
      saveData();
      render();
    });
  });
};

render();

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = headerInput.value.trim();

  if (!text) {
    return;
  }

  const newTodo = {
    text: text,
    completed: false,
  };

  todoData.push(newTodo);
  headerInput.value = "";
  saveData();
  render();
});
