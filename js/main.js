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
