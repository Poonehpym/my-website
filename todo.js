let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("taskList");
let counter = document.getElementById("taskCounter");
let clearAllBtn = document.getElementById("clearAllBtn");

function updateCounter() {
    let tasks = list.querySelectorAll("li");
    let tasksLeft = 0;

    tasks.forEach(function (task) {
        if (!task.classList.contains("done")) {
            tasksLeft++;
        }
    });

    counter.textContent = tasksLeft + (tasksLeft === 1 ? " task left" : " tasks left");
}

function addTask() {
    let text = input.value.trim();
    if (text === "") {
        return;
    }

    let li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", function () {
        li.classList.toggle("done");
        updateCounter();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
        updateCounter();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = "";
    updateCounter();
}

addBtn.addEventListener("click", addTask);

clearAllBtn.addEventListener("click", function () {
    list.innerHTML = "";
    updateCounter();
});

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});