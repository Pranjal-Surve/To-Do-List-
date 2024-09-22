let todos = [];
let completedTodos = [];

const button = document.getElementById('add-button');
const input = document.getElementById('todo-input');
const ul = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');

function renderTasks() {
    ul.innerHTML = "";
    todos.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center"; 

        const text = document.createElement("span");
        text.innerText = item;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "d-flex"; 

        const completeButton = document.createElement("button");
        completeButton.className = "btn btn-success btn-sm me-2"; // Keep this for spacing
        completeButton.style.marginRight = "5px"; // Add this line for additional space
        completeButton.innerHTML = '<i class="bi bi-check-circle"></i>';

        completeButton.onclick = () => {
            completedTodos.push(item);
            todos = todos.filter(task => task !== item);
            renderTasks();
            renderCompletedTasks();
        };

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
        deleteButton.onclick = () => {
            todos = todos.filter(task => task !== item);
            renderTasks();
        };

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);
        
        li.appendChild(text);
        // New: Append button container to the list item
        li.appendChild(buttonContainer); 
        ul.appendChild(li);
    });
}

function renderCompletedTasks() {
    completedList.innerHTML = "";
    completedTodos.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-success text-white";

        const text = document.createElement("span");
        text.innerText = item;
        text.className = "completed";

        // New: Create button container to group buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "d-flex";

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
        deleteButton.onclick = () => {
            completedTodos = completedTodos.filter(task => task !== item);
            renderCompletedTasks();
        };

        // New: Append the delete button to the button container
        buttonContainer.appendChild(deleteButton);
        
        li.appendChild(text);
        // New: Append button container to the list item
        li.appendChild(buttonContainer); 
        completedList.appendChild(li);
    });
}


// Add task function
function addTask() {
    let todo = input.value.trim();
    if (todo === "") {
        alert("Please enter a task.");
        return;
    }
    if (todos.includes(todo) || completedTodos.includes(todo)) {
        alert("Task already exists");
        return;
    }
    todos.push(todo);
    renderTasks();
    input.value = "";
}

// Add task on button click
button.addEventListener('click', () => {
    addTask();
});

// Add task on pressing Enter
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});
