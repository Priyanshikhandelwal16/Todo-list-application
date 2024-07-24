document.addEventListener('DOMContentLoaded', () => {
    gsap.from('.app-container', { opacity: 0, scale: 0.8, duration: 1, delay: 0.5 });
    gsap.from('.header', { y: -50, opacity: 0, duration: 1, delay: 0.5 });
    gsap.from('.input-container', { y: 50, opacity: 0, duration: 1, delay: 1 });

    document.getElementById('addTaskButton').addEventListener('click', addTask);

    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');

    themeToggle.addEventListener('change', function() {
        const isDarkMode = this.checked;
        document.body.classList.toggle('dark', isDarkMode);
        themeLabel.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    });

    // Set initial theme based on system preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    themeToggle.checked = prefersDarkScheme;
    document.body.classList.toggle('dark', prefersDarkScheme);
    themeLabel.textContent = prefersDarkScheme ? 'Light Mode' : 'Dark Mode';
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dueDate = document.getElementById('taskDueDate').value;
    const category = document.getElementById('taskCategory').value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;
    li.classList.add(category);

    if (dueDate) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = `Due: ${new Date(dueDate).toLocaleString()}`;
        dateSpan.classList.add('due-date');
        li.appendChild(dateSpan);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        gsap.to(li, { x: -100, opacity: 0, duration: 0.5, onComplete: () => taskList.removeChild(li) });
    });

    li.appendChild(deleteButton);
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    taskList.appendChild(li);
    taskInput.value = '';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('taskCategory').value = 'work';

    gsap.from(li, { x: -100, opacity: 0, duration: 0.5 });
    gsap.to(li, { x: 0, opacity: 1, duration: 0.5 });
}


   

