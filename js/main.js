"use strict";
let listaEventos = [];

// Función para seleccionar un elemento del DOM
const Selector = (domItem) => document.querySelector(domItem);

// Seleccionar el elemento con id "timeLine"
const timeLine = Selector("#timeLine");

// Realizar una petición fetch para obtener el archivo JSON "zelda-timeLine.json"
const fetchData = async () => {
  try {
    const response = await fetch("zelda-timeline.json");
    listaEventos = await response.json();
  } catch (error) {
    console.error("Error cargando el JSON:", error);
  }
};

// Función para ordenar los datos por fecha de forma ascendente
const ordenarPorFechaAsc = (jsonData) => {
  jsonData.sort((a, b) => {
    return a.date - b.date;
  });
  return jsonData;
};

// Función para generar un color aleatorio en formato RGB
function generarColorAleatorioRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

// Función para mostrar los datos en formato HTML
function mostrarJsonEnHTML(jsonData) {
  timeLine.innerHTML = "";
  const lista = document.createElement("ul");
  jsonData.forEach((obj) => {
    const item = document.createElement("li");

    // Generar un color aleatorio en formato RGB para el elemento <li>
    const colorAleatorioRGB = generarColorAleatorioRGB();

    // Crear elementos HTML con la información de cada objeto
    item.innerHTML = `
          <p class="dateEvent" style="background-color: ${colorAleatorioRGB};">Date: ${obj.date}</p>
          <p class="titleEvent">Title: ${obj.title}</p>
          <img class="imgEvent" src="${obj.image}" alt="${obj.title}">
          <p class="textEvent">${obj.text}</p>
      `;

  lista.appendChild(item); // Añadir cada elemento a la lista
  });

  timeLine.appendChild(lista); // Añadir la lista al elemento con id "timeLine"
}

// Función para manejar el evento de agregar nuevo evento
function handleAddEvent(e) {
  e.preventDefault();
  const date = Selector("#date").value;
  const title = Selector("#title").value;
  const image = Selector("#imageEvent").value;
  const text = Selector("#text").value;

// Detener la ejecución si algún campo está vacío
  if (!date || !title) {
    alert("Por favor, completa los campos de fecha y título para agregar un evento.");
    return; 
  }

  const newEvent = {
    date: Number(date),
    title: title,
    image: image,
    text: text,
  };

  // Cambios que hice para limpiar el formulario y añadir la ventana popup
  // Limpiar el formulario
  Selector("#date").value = "";
  Selector("#title").value = "";
  Selector("#imageEvent").value = "";
  Selector("#text").value = "";

  // Ocultar popup

  formContainer.style.display = "none";

  // Ocultar overlay
  const overlay = Selector(".overlay");
  overlay.style.display = "none";

  // Mostrar el nuevo evento en el timeline
  listaEventos.push(newEvent);
  listaEventos = ordenarPorFechaAsc(listaEventos);
  localStorage.setItem('eventos', JSON.stringify(listaEventos));

  mostrarJsonEnHTML(listaEventos);
}

// Función para manejar el evento de mostrar/ocultar el formulario
function btnForm() {
  const formContainer = Selector("#formContainer");
  if (formContainer.style.display !== "block") {
    formContainer.style.display = "block";
  } else {
    formContainer.style.display = "none";
  }
}

// Agregar evento al botón para mostrar/ocultar el formulario
Selector("#addBotonForm").addEventListener("click", btnForm);

Selector("#formContainer").addEventListener("submit", handleAddEvent);

// Función principal para cargar los datos y mostrarlos en el timeline
async function main() {
  await fetchData();
  listaEventos = ordenarPorFechaAsc(listaEventos);
  mostrarJsonEnHTML(listaEventos);
}

// Llamar a la función principal
main();

Selector("#closeEventBtn").addEventListener("click", () => {
  formContainer.style.display = "none";
});



//LOCAL STORAGE
window.addEventListener('load', () => {
  const eventosGuardados = localStorage.getItem('eventos');
  if (eventosGuardados) {
    listaEventos = JSON.parse(eventosGuardados);
    mostrarJsonEnHTML(listaEventos); // Mostrar eventos guardados al cargar la página
  }
});

