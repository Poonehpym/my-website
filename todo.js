let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("taskList");

function addTask() {
    let text = input.value.trim();
    if (text === "") {
        return;
    }

    let li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", function () {
        li.classList.toggle("done");
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});