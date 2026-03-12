//================Access Element=============
const input = document.getElementById("input-Todo");
const button = document.getElementById("button");
const List = document.querySelector(".container");
const Error = document.querySelector(".error");
const Task = document.querySelector("#taskCount");
const ul = document.querySelector("ul");
const clearTask = document.querySelector("#Clear");
const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const completedBtn = document.getElementById("completedBtn");
const themeToggel = document.querySelector("#Toggle");
const body = document.querySelector("body");


let todos = [];

// ================Button Click=================
button.addEventListener("click", () => {
    const Value = input.value;
    console.log(Value);
    if (validation()) {
        addTodo();
    }
});


//================ Validation =================
function validation() {
    if (input.value.trim() === "") {
        alert("Enter Your Task");
        return false;
    }
    return true;
}


// ================ onload Window =================
window.onload = function () {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        todos.forEach(function (task) {
            const li = document.createElement("li");
            li.innerText = task;
        });
        updateCount();
    }
}


// ================ Add Todo =================
function addTodo() {
    if (input.value.trim() === "") {
        alert("Enter Your Task");
        buttonDisable();
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = input.value;
    // li.innerText = input.value.trim();

    //save Task
    todos.push(input.value.trim());
    localStorage.setItem("todos", JSON.stringify(todos));

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("box");

    checkBox.addEventListener('change', function () {
        if (checkBox.checked) {
        span.style.textDecoration = "line-through";
        } else {
        span.style.textDecoration = "none";
        }
    });


    //================ All Button =================
    allBtn.addEventListener("click", function () {
        document.querySelectorAll("li").forEach(function (task) {
            task.style.display = "flex";
        });
    });



    //================ Active Button =================
    activeBtn.addEventListener("click", function () {
        document.querySelectorAll("li").forEach(function (task) {
            const checkBox = task.querySelector("input[type='checkbox']");

            if (checkBox.checked) {
                task.style.display = "none";
            } else {
                task.style.display = "flex";
            }
        });
    });


    // ================ Complete Button =================
    completedBtn.addEventListener("click", function () {
        document.querySelectorAll("li").forEach(function (task) {
            const checkBox = task.querySelector("input[type='checkbox']");

            if (checkBox.checked) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        });
    });


    clearTask.addEventListener("click", function () {
        ul.innerHTML = "";
        updateCount();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCount();
        const index = todos.indexof(li.innerText);

        if (index > -1) {
            todos.splice(index, 1);
        }

        localStorage.setItem("todos", JSON.stringify(todos));

    });

    li.prepend(checkBox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);

    updateCount();

    inputClear();
    input.focus();
}


//================ Add Todo =================
function inputClear() {
    input.value = "";
}

//================ Enter Press =================
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        validation();
        addTodo();
    }
});


//================ button Disable =================
function buttonDisable() {
    button.disabled = true;
};

//================ button Enable =================
function buttonEnable() {
    button.disabled = false;
};


// ================ Count Tasks =================
function updateCount() {
    Task.innerText = "Task : " + ul.children.length;
}


// ================ DARK MODE =================
themeToggel.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeToggel.innerText = "Light Mode";
        document.body.style.backgroundColor = "#1a1a1a"; // Dark color
    } else {
        themeToggel.innerText = "Dark Mode";
        document.body.style.backgroundColor = "white"; // Light color
    }
});
