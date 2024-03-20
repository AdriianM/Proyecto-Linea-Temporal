"use strict";

// Función para seleccionar un elemento del DOM
const Selector = (domItem) => document.querySelector(domItem);

// Seleccionar el elemento con id "timeLine"
const timeLine = Selector("#timeLine");

// Realizar una petición fetch para obtener el archivo JSON "zelda-timeLine.json"
fetch("zelda-timeline.json")
  .then((response) => response.json()) // Convertir la respuesta a JSON
  .then((jsonData) => {
    // Ordenar los datos por fecha de forma ascendente
    const jsonDataOrdenado = ordenarPorFechaAsc(jsonData);
    // Mostrar los datos en formato HTML
    mostrarJsonEnHTML(jsonDataOrdenado);
  })
  .catch((error) => console.error("Error cargando el JSON:", error)); // Capturar errores

// Función para ordenar los datos por fecha de forma ascendente
const ordenarPorFechaAsc = (jsonData) => {
  jsonData.sort((a, b) => {
    const fechaA = new Date(a.date);
    const fechaB = new Date(b.date);
    return fechaA - fechaB;
  });
  return jsonData;
};

// Llamar a la función de ordenar por fecha

// Función para mostrar los datos en formato HTML
function mostrarJsonEnHTML(jsonData) {
  const lista = document.createElement("ul");
  jsonData.forEach((obj) => {
    const item = document.createElement("li");
    // Crear elementos HTML con la información de cada objeto
    item.innerHTML = `
          <p id="dateEvent">Date: ${obj.date}</p>
          <p id="titleEvent">Title: ${obj.title}</p>
          <img id="imgEvent" src="${obj.image}" alt="${obj.title}">
          <p id="textEvent">${obj.text}</p>
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
  const image = Selector("#image").value;
  const text = Selector("#text").value;
  
  const newEvent = {
    date: date,
    title: title,
    image: image,
    text: text
  };
  
  // Mostrar el nuevo evento en el timeline
  mostrarNuevoEvento(newEvent);
}

// Función para mostrar un nuevo evento en el timeline
function mostrarNuevoEvento(event) {
  const lista = timeLine.querySelector("ul");
  const item = document.createElement("li");
  // Crear elementos HTML con la información del nuevo evento
  item.innerHTML = `
      <p>Date: ${event.date}</p>
      <p>Title: ${event.title}</p>
      <img src="${event.image}" alt="${event.title}">
      <p>Text: ${event.text}</p>
  `;
  lista.appendChild(item); // Añadir el nuevo evento a la lista existente
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


// Agregar evento al botón de agregar
//Selector("#addEventBtn").addEventListener("click", handleAddEvent);


// Función principal para cargar los datos y mostrarlos en el timeline
async function main() {
  const jsonData = await fetchData();
  const jsonDataOrdenado = ordenarPorFechaAsc(jsonData);
  mostrarJsonEnHTML(jsonDataOrdenado);
}

// Llamar a la función principal
main();
