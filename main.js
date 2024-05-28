document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    loadTasks();

    if (form && input && list_el) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const task = input.value;

            if (task === "") {
                alert("Task cannot be empty");
                return;
            }

            const task_el = createTaskElement(task);

            list_el.appendChild(task_el);

            saveTask(task);

            input.value = '';
        });
    } else {
        console.error("One or more required elements are missing from the DOM.");
    }

    function createTaskElement(task) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const checkbox_el = document.createElement('input');
        checkbox_el.type = 'checkbox';
        checkbox_el.classList.add('task-checkbox');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(checkbox_el);
        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Editar';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Deletar';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                updateTask(task_input_el.value, task);
                task = task_input_el.value;
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            deleteTask(task);
        });

        return task_el;
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const task_el = createTaskElement(task);
            list_el.appendChild(task_el);
        });
    }

    function updateTask(newTask, oldTask) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.indexOf(oldTask);
        if (taskIndex > -1) {
            tasks[taskIndex] = newTask;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
