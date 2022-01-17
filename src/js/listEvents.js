/**
 * Código del funcionamiento del apartado de 'listadoEventos'.
 * @author Laura Cecilia Guerrero <lcecilia@cifpfbmoll.eu>
 */
window.onload = function () {
    /**
     * Contantes del Modal
     * @type {NodeListOf<Element>}
     */
    const openSectionForm = document.querySelectorAll("[data-open]");
    const closeSectionForm = document.querySelectorAll("[data-close]");
    const isVisible = "is-visible";
    /**
     * Impression
     * @type {HTMLElement}
     */
    let cerrarMenuById = document.getElementById("cerrarMenu");
    let menuBuscarMovilById = document.getElementById("menuBuscarMovil");
    let menuById = document.getElementById("menu");

    /**
     * Estado del menu responsive
     * @type {boolean}
     */
    let estadoMenuMovil = false;

    /**
     * Función para usar el botón del menu responsive
     */
    menuBuscarMovilById.addEventListener("click", function () {
        estadoMenuMovil = !estadoMenuMovil;
        if (estadoMenuMovil) {
            cerrarMenuById.innerHTML = `&times;`;
            menuById.style = `display: block`;

        } else {
            cerrarMenuById.innerHTML = `&#9776;`;
            menuById.style = `display: none`;
        }
    })

    /**
     * Apartado del modal
     */
    for (const el of openSectionForm) {
        el.addEventListener("click", function() {
            const modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(isVisible);
        });
    }

    for (const el of closeSectionForm) {
        el.addEventListener("click", function() {
            this.parentElement.parentElement.parentElement.classList.remove(isVisible);
        });
    }

    document.addEventListener("click", e => {
        if (e.target === document.querySelector(".ventanaEmergenteEventForm.is-visible")) {
            document.querySelector(".ventanaEmergenteEventForm.is-visible").classList.remove(isVisible);
        }
    });

    document.addEventListener("keyup", e => {
        if (e.key === "Escape" && document.querySelector(".ventanaEmergenteEventForm.is-visible")) {
            document.querySelector(".ventanaEmergenteEventForm.is-visible").classList.remove(isVisible);
        }
    });
}

/**
 * importo los datos y la función para ordenar, creada el index.js
 */
import {data} from './dataNewsEvents.js';
import {formatDate} from "./index.js";

/**
 * impresión
 * @type {HTMLElement}
 */
let tableTbodyById = document.getElementById("bodyTable");
let tableTfootById = document.getElementById("footerTable");


/**
 * Lista ordenada de eventos
 */
let listadoEventosOrdenado = data.eventos.sort(function (a, b) {
    if (formatDate(b.fecha) > formatDate(a.fecha)) {
        return 1
    } else if (formatDate(a.fecha) > formatDate(b.fecha)) {
        return -1
    } else {
        return 0
    }
});

/**
 * Funciones para imprimir la lista de eventos
 */
function imprimirListaEventos() {
    if (!listadoEventosOrdenado) return
    let listaEventos = ``;
    console.log(`Eventos`);
    listadoEventosOrdenado.forEach(evento => {
        console.log(`img ${evento.imagen} \nTitulo ${evento.titulo}
Ubiccación ${evento.ubicacion} \nTipo ${evento.tipo}
Dia ${evento.fecha} Hora ${evento.hora}
Descripción ${evento.descripcion} \nAutor ${evento.autor}`);
        listaEventos += `
            <tr>
                <th>${evento.titulo}</th>
                <th>${evento.tipo}</th>
                <th>${evento.autor}</th>
                <th>${evento.fecha}</th>
                <th><i class="fas fa-edit"></i></th>
                <th><i class="far fa-trash-alt"></i></th>
            </tr>
        `;
    })
    tableTbodyById.innerHTML = `${listaEventos}`;

    let numeroTotalEventos = `${data.eventos.length}`;
    tableTfootById.innerHTML = `${numeroTotalEventos}`;
}

/**
 * Llamo a la función para que se ejecute
 */
imprimirListaEventos();
