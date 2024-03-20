const selectorID = domItem => document.getElementById(domItem)

// Variables para los elementos del formulario y la lista de tareas
const taskForm = selectorID ('taskForm');
const taskTitleInput = selectorID ('taskTitle');
const taskImageInput = selectorID ('taskImage');
const taskTextInput = selectorID ('taskText');
const taskDateInput = selectorID ('taskDate');
const taskList = selectorID ('taskList');

// Cargar y mostrar las tareas al cargar la página
window.addEventListener('load', function() {
    loadTasks();
});

// Función para cargar las tareas desde el archivo JSON
function fetchTasks() {
    return fetch('zelda-timeline.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Error al cargar las tareas desde el archivo JSON:', error);
            return []; // Si hay un error, retornamos un array vacío
        });
}

// Función para cargar las tareas
async function loadTasks() {
    const [localTasks, fetchedTasks] = await Promise.all([getLocalTasks(), fetchTasks()]);
    const combinedTasks = mergeTasks(localTasks, fetchedTasks);
    displayTasks(combinedTasks);
}

// Función para obtener las tareas locales
function getLocalTasks() {
    const localTasks = localStorage.getItem('tasks');
    return localTasks ? JSON.parse(localTasks) : [];
}

// Función para combinar las tareas locales y las tareas obtenidas del archivo JSON
function mergeTasks(localTasks, fetchedTasks) {
    const mergedTasks = [...localTasks];
    fetchedTasks.forEach(fetchedTask => {
        if (!mergedTasks.some(task => task.title === fetchedTask.title)) {
            mergedTasks.push(fetchedTask);
        }
    });
    return mergedTasks;
}

// Función para mostrar las tareas en la lista
function displayTasks(tasks) {
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Ordenar por fecha ascendente
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.date}</p>
            <img class="img-juego" src="${task.image}" alt="${task.title}">
            <p>${task.text}</p>
        `;
        taskList.appendChild(li);
    });
}

// Manejador de envío del formulario
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = taskTitleInput.value.trim();
    const image = taskImageInput.value.trim();
    const text = taskTextInput.value.trim();
    const date = taskDateInput.value.trim();
    if (title !== '' && text !== '' && date !== '') {
        const newTask = { date, title, image, text };
        saveTask(newTask);
        taskTitleInput.value = '';
        taskImageInput.value = '';
        taskTextInput.value = '';
        taskDateInput.value = '';
    }
});

// Función para guardar una tarea
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(); // Cargar y mostrar las tareas actualizadas
}
