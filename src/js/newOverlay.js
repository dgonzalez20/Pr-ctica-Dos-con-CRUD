/**
 * Código del funcionamiento de la section de 'listadoEventos' y de la section de 'ventanaEmergenteEventForm'.
 * @author Laura Cecilia Guerrero <lcecilia@cifpfbmoll.eu>
 */
/**
 * importo los datos y la función para ordenar, creada el index.js
 */
import {data} from './dataNewsEvents.js';
import {formatDate} from "./index.js";

/**
 * Creo un evento
 * @type {HTMLElement}
 */
let crearEventoById = document.getElementById("crearEvento");

/**
 * Impresion
 * @type {HTMLElement}
 */
let actualizarTableTbodyById = document.getElementById("bodyTable");
let actualizarTableTfootById = document.getElementById("footerTable");

/**
 * Crear un nuevo evento
 */
function cogerMeterDatos() {
    let tituloById = document.getElementById("tituloEvent");
    let ubicacionById = document.getElementById("ubicacionEvent");
    let tipoById = document.getElementById("tipoEvent");
    let imagenById = document.getElementById("imagenEvent");
    let descripcionById = document.getElementById("descripcionEvent");
    let autorById = document.getElementById("autorEvent");
    let fechaById = document.getElementById("fechaEvent");
    let horaById = document.getElementById("horaEvent");

    let tituloEvento = tituloById.value;
    let ubicacionEvento = ubicacionById.value;
    let tipoEvento = tipoById.value;
    let imagenEvento = imagenById.value;
    let descripcionEvento = descripcionById.value;
    let autorEvento = autorById.value;
    let fechaEvento = `${fechaById.value.toString().substring(8, 10)} / ${fechaById.value.toString().substring(5, 7)} / ${fechaById.value.toString().substring(0,4)}`;
    let horaEvento = horaById.value;

    let arrayNewEvent = new Object({
        "titulo": tituloEvento, "ubicacion": ubicacionEvento,
        "descripcion": descripcionEvento, "tipo": tipoEvento, "imagen": imagenEvento,
        "autor": autorEvento, "fecha": fechaEvento, "hora": horaEvento
    });

    data.eventos.push(arrayNewEvent);
}


/**
 * Lista ordenada de eventos
 */
let actualizarListaEventosOrdenado = data.eventos.sort(function (a, b) {
    if (formatDate(b.fecha) > formatDate(a.fecha)) {
        return 1
    } else if (formatDate(a.fecha) > formatDate(b.fecha)) {
        return -1
    } else {
        return 0
    }
})

/**
 * Funciones para imprimir la lista actualizada de eventos
 */
function actualizarListaEventos() {
    let listaEventosActualizada = ``;
    console.log(`Eventos`);
    actualizarListaEventosOrdenado.forEach(
        evento => {
             console.log(`img ${evento.imagen} \nTitulo ${evento.titulo}
     Ubiccación ${evento.ubicacion} \nTipo ${evento.tipo}
     Dia ${evento.fecha} Hora ${evento.hora}
     Descripción ${evento.descripcion} \nAutor ${evento.autor}`);
            listaEventosActualizada += `
            <tr>
                <th>${evento.titulo}</th>
                <th>${evento.tipo}</th>
                <th>${evento.autor}</th>
                <th>${evento.fecha}</th>
                <th><i class="fas fa-edit"></i></th>
                <th><i class="far fa-trash-alt"></i></th>
            </tr>
        `;
        }
    )

    actualizarTableTbodyById.innerHTML = `${listaEventosActualizada}`;
    let numeroTotalEventosActualizada = `${data.eventos.length}`;
    actualizarTableTfootById.innerHTML = `${numeroTotalEventosActualizada}`;
}

/**
 * Si hacen un click ha esto boton me llama a las siguientes funciones
 */
crearEventoById.addEventListener("click", function () {
    cogerMeterDatos();
    actualizarListaEventos();
});
