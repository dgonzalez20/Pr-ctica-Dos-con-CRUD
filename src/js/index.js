/**
 * Código del funcionamiento del apartado de index
 * @author Laura Cecilia Guerrero <lcecilia@cifpfbmoll.eu>
 */
window.onload = function () {
    /**
     * edición estética del html
     * @type {HTMLElement}
     */
    let cerrarMenuById = document.getElementById("cerrarMenu");
    let menuBuscarMovilById = document.getElementById("menuBuscarMovil");
    let menuById = document.getElementById("menu");
    let botonGoToTopById = document.querySelectorAll("#goToTop");

    /**
     * Estado del menu responsive
     * @type {boolean}
     */
    let estadoMenuMovil = false;

    /**
     * Función para hacer un scroll
     */
    function toTop() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            botonGoToTopById.style = "display: block;";
        } else {
            botonGoToTopById.style = "display: none;";
        }
    }

    /**
     * Función para subir el scroll hacia arriba.
     */
    botonGoToTopById.forEach(botonGoToTop => {
        botonGoToTop.addEventListener("click", function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
    })})

    window.onscroll = function() {
        toTop()
    }

    /**
     * Función para usar el botón del menu responsive
     */
    menuBuscarMovilById.addEventListener("click", function () {
        estadoMenuMovil = !estadoMenuMovil;
        if (estadoMenuMovil) {
            cerrarMenuById.innerHTML = "&times;";
            menuById.style = "display: block;";
        } else {
            cerrarMenuById.innerHTML = "&#9776;";
            menuById.style = "display: none;";
        }
    })
}

/**
 * Importo los datos
 */
import {data} from './dataNewsEvents.js';

/**
 * impresión
 * @type {HTMLElement}
 */
let indexListEventsById = document.getElementById("listEvents");
let indexListNewsById = document.getElementById("listNews");

/**
 * Hago el formato de fecha
 * @returns {string}
 */
export const formatDate = function (date) {
    let fecha = new Date(date.toString().substring(5, 7) + "/" + date.toString().substring(8, 10) + "/" + date.toString().substring(0,4)).getTime();
    console.log(fecha);
    return fecha.toString();
}

/**
 * Lista ordenada de eventos
 */
let ordenadoEventos = data.eventos.sort(function (a, b) {
    if (formatDate(b.fecha) > formatDate(a.fecha)) {
        return 1
    } else if (formatDate(a.fecha) > formatDate(b.fecha)) {
        return -1
    } else {
        return 0
    }
})

/**
 * Lista ordenada de noticias
 */
let ordenadoNoticias = data.noticias.sort(function (a, b) {
    if (formatDate(b.fecha) > formatDate(a.fecha)) {
        return 1
    } else if (formatDate(a.fecha) > formatDate(b.fecha)) {
        return -1
    } else {
        return 0
    }
})

/**
 * Función para imprimir la lista de eventos
 * @returns {string}
 */
function imprimirDatosEventos() {
    let listaEventos = ``;
    console.log(`Eventos`);
    if (!indexListEventsById) return
    ordenadoEventos.forEach(evento => {
        listaEventos += `
            <article>
                <div class="imgTituloUbicacionTipoDiaHora">
                    <img src="${evento.imagen}" alt="event ${evento.titulo}">
                    <div class="tituloUbicacionTipoDiaHora">
                        <h1>Titulo<br>${evento.titulo}</h1>
                        <span>Ubiccación<br>${evento.ubicacion}<br>Tipo<br>${evento.tipo}</span>
                    </div>
                    </div>
                <span>Dia<br>${evento.fecha}<br>Hora<br>${evento.hora}</span>
                <div>Descripción<br>${evento.descripcion}</div>
                <span>Autor<br>${evento.autor}</span>
            </article>
        `;
    })
    return indexListEventsById.innerHTML = `${listaEventos}`;
}

/**
 * Función para imprimir la lista de noticias
 * @returns {string}
 */
function imprimirDatosNoticias() {
    let listaNoticias = ``;
    console.log(`Noticias`);
    if (!indexListNewsById) return
    ordenadoNoticias.forEach(noticia => {
        listaNoticias += `
            <article>
                <div class="imgTituloDia">
                    <img src="${noticia.imagen}" alt="new ${noticia.titulo}">
                    <div class="tituloDia">
                        <h1>Titulo<br>${noticia.titulo}</h1>
                        <span>Dia<br>${noticia.fecha}</span>
                    </div>
                </div>
                <div>Descripción<br>${noticia.descripcion}</div>
                <span>Autor<br>${noticia.autor}</span>
            </article>
        `;
    })
    return indexListNewsById.innerHTML = `${listaNoticias}`;
}

/**
 * Llamo a las funciones para que se ejecuten
 */
imprimirDatosNoticias();
imprimirDatosEventos();