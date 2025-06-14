document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.getElementById("add-task-btn");
  const toDoInput = document.getElementById("todo-input");
  const toDoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTasks(task));

  addTaskBtn.addEventListener("click", function (event) {
    const taskInput = toDoInput.value.trim();
    console.log(taskInput);
    if (taskInput.length == 0) {
      alert("Please Enter task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskInput,
      isCompleted: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    toDoInput.value = "";
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks(task) {
    const TaskText = task.text;
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.isCompleted) {
      li.classList.add("done");
    }

    li.innerHTML = `<span>${TaskText}</span>
    <button>Delete</button>
    `;
    li.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("done");
      saveTasks();
    });

    toDoList.appendChild(li);
    li.querySelector("button").addEventListener("click", function (e) {
      e.stopPropagation();

      tasks.forEach((t) => console.log(`T Id :${t.id} -> Task ID :${task.id}`));
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });
  }
});
