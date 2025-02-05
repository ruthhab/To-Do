// Initialize todos from localStorage or empty arrays if none exist
let activeTodos = JSON.parse(localStorage.getItem('activeTodos')) || [];
let completedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];

// Update localStorage
function updateStorage() {
    localStorage.setItem('activeTodos', JSON.stringify(activeTodos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
}

// Add new todo
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        activeTodos.push({
            text: text,
            id: Date.now()
        });
        updateStorage();
        renderTodos();
        input.value = '';
    }
}

// Complete todo
function completeTodo(id) {
    const todoIndex = activeTodos.findIndex(todo => todo.id === id);
    if (todoIndex > -1) {
        const todo = activeTodos[todoIndex];
        todo.completedAt = new Date().toLocaleString();
        completedTodos.push(todo);
        activeTodos.splice(todoIndex, 1);
        updateStorage();
        renderTodos();
    }
}

// Delete todo
function deleteTodo(id, isCompleted) {
    const list = isCompleted ? completedTodos : activeTodos;
    const index = list.findIndex(todo => todo.id === id);
    if (index > -1) {
        list.splice(index, 1);
        updateStorage();
        renderTodos();
    }
}

// Render todos
function renderTodos() {
    const activeTodoList = document.getElementById('activeTodoList');
    const completedTodoList = document.getElementById('completedTodoList');
    
    // Render active todos
    activeTodoList.innerHTML = activeTodos.map(todo => `
        <li>
            <input type="checkbox" onchange="completeTodo(${todo.id})" class="todo-checkbox">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id}, false)">Delete</button>
        </li>
    `).join('');
    
    // Render completed todos
    completedTodoList.innerHTML = completedTodos.map(todo => `
        <li>
            <input type="checkbox" checked disabled class="todo-checkbox">
            <span class="todo-text">${todo.text}</span>
            <span class="timestamp">${todo.completedAt}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id}, true)">Delete</button>
        </li>
    `).join('');
}

// Add event listener for Enter key
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
renderTodos();
