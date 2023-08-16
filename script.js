const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.getElementById('add-btn').addEventListener('click', function() {
    const inputValue = document.getElementById('todo-input').value;
    const description = document.getElementById('todo-description').value;

    if (inputValue) {
        tasks.push({
            title: inputValue,
            description: description,
            completed: false
        });

        renderTasks();
        updateLocalStorage();

        // Clear inputs
        document.getElementById('todo-input').value = '';
        document.getElementById('todo-description').value = '';
    }
});

document.getElementById('filters').addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON') {
        document.querySelectorAll('#filters button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderTasks();
    }
});

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    const filter = document.querySelector('#filters .active').getAttribute('data-filter');

    tasks.forEach((task, index) => {
        if(filter === 'completed' && !task.completed) return;
        if(filter === 'pending' && task.completed) return;

        const li = document.createElement('li');

        // const checkbox = document.createElement('input');
        // checkbox.type = 'checkbox';
        // checkbox.checked = task.completed;
        // checkbox.addEventListener('change', function() {
        //     task.completed = checkbox.checked;
        //     renderTasks();
        //     updateLocalStorage();
        // });

        // const toggleBtn = document.createElement('div');
        // toggleBtn.classList.add('toggle-btn');
        // toggleBtn.addEventListener('click', function() {
        //     task.completed = !task.completed;
        //     renderTasks();
        //     updateLocalStorage();
        // });
        // if(task.completed) {
        //     toggleBtn.style.backgroundColor = "#F4B400"; // Golden color when task is completed
        // }

        const toggleBtn = document.createElement('div');
toggleBtn.classList.add('toggle-btn');
if(task.completed) {
    toggleBtn.classList.add('active'); // If task is completed, make the toggle active
}
toggleBtn.addEventListener('click', function() {
    task.completed = !task.completed;
    renderTasks();
    updateLocalStorage();
});
li.appendChild(toggleBtn);


        const span = document.createElement('span');
        span.textContent = task.title;
        if(task.completed) span.classList.add('completed');

        const desc = document.createElement('p');
        desc.textContent = task.description;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            tasks.splice(index, 1);
            renderTasks();
            updateLocalStorage();
        });

        // li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(desc);
        li.appendChild(removeBtn);
        // li.appendChild(toggleBtn);
        todoList.appendChild(li);
    });
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


const themeSelector = document.getElementById('theme-selector');
themeSelector.addEventListener('change', function() {
    document.body.classList.remove("blue","pink","light","dark","default")
    document.body.classList.add(this.value);
});


renderTasks();


