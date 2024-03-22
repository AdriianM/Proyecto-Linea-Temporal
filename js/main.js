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

// Llamar a la función de ordenar por fecha

// Función para mostrar los datos en formato HTML
function mostrarJsonEnHTML(jsonData) {
  timeLine.innerHTML = "";
  const lista = document.createElement("ul");
  jsonData.forEach((obj) => {
    const item = document.createElement("li");
    // Crear elementos HTML con la información de cada objeto
    item.innerHTML = `
          <p class="dateEvent">Date: ${obj.date}</p>
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
 
 mostrarJsonEnHTML(listaEventos);
}

// Función para manejar el evento de mostrar/ocultar el formulario
function btnForm() {
  const formContainer = Selector("#formContainer");
  if (formContainer.style.display === "none") {
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

Selector("#closeEventBtn").addEventListener("click",()=>  {
  formContainer.style.display = "none";
})