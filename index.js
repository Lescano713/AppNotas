const body = document.body;
const crear = document.getElementById("crear");
const textArea = document.getElementById("text-area");
const notasCreadas = document.getElementById("notas-creadas");

// temas

function oscuro() {
    body.classList.add("fondo-oscuro");
    guardarTema("oscuro")
}
function claro(){
    body.classList.remove("fondo-oscuro");
    guardarTema("claro")

}


function guardarTema(tema) {
    localStorage.setItem("tema", tema)
}

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {
    oscuro()
} else {
    claro()
}


// tarjetas

let arrayNotas = JSON.parse(localStorage.getItem("arrayNotas")) || [];
let numero = arrayNotas.length > 0 ? parseInt(arrayNotas[arrayNotas.length - 1].id.replace('tarjeta', '')) + 1 : 1;

cargarTarjetas();
crear.addEventListener("click", crearTarjeta);

function guardarNotasEnLocal(){
    localStorage.setItem("arrayNotas", JSON.stringify(arrayNotas));
}

function cargarTarjetas() {
    notasCreadas.innerHTML = "";
    if(arrayNotas.length > 0 ){
        arrayNotas.forEach(nota => {
        const div = document.createElement("div");
        const button =  document.createElement("button");
        div.classList.add("tarjeta");
        div.id = nota.id;
        div.innerHTML = `
            <h3>${nota.tarjeta}</h3>
            <button type="button" class="delete">Delete <i class="fa-regular fa-trash-can"></i></button>
        `;
        notasCreadas.appendChild(div);
        div.appendChild(button);
        button.innerHTML = "Sin completar"
        textArea.value = "";
        const eliminarBoton = div.querySelector(".delete")
        eliminarBoton.addEventListener("click", ()=> eliminarTarjeta(div.id))
        button.addEventListener("click", e => div.classList.toggle("tarjeta-marcada"));
        // button.addEventListener("click", e => cambiarCoso(button, div.id));
        
        });
    }
}
// let coso = true;
function cambiarCoso(elemento, id) {
    // const tareaCompletar = document.getElementById(id);
    
    // if(coso){
        elemento.innerHTML = "Completado"
        elemento.classList.toggle("completado") 
        // tareaCompletar.classList.toggle("tarjeta-marcada")
    // }else{
    //     elemento.innerHTML = "Sin completar"
    //     elemento.classList.remove("completado")
    // }
    // coso = false
}


function crearTarjeta(){
    const contenido = textArea.value;
    if (contenido !== "") {
        const notas = {
            id : `tarjeta${numero++}`,
            tarjeta : contenido,
        }
        arrayNotas.push(notas)
        guardarNotasEnLocal()
        cargarTarjetas()
    }else{
        alert("Ingresa contenido a la tarjeta por favor")
    }
}


function eliminarTarjeta(id) {
    const tarjetaBorrar = document.getElementById(id);
    
    if (tarjetaBorrar) {
        tarjetaBorrar.remove();
        arrayNotas = arrayNotas.filter(notas => notas.id !== id)
        guardarNotasEnLocal()
        console.log("tarjeta eliminada " + id)
    }
    
}

