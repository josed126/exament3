let mis_peliculas_iniciales = [
    {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
    {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
    {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"}
];

localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);


// VISTAS
const indexView = (peliculas) => {
    let i=0;
    let view = "";

    while(i < peliculas.length) {
      view += `
        <div class="movie">
           <div class="movie-img">
                <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
           </div>
           <div class="title">
               ${peliculas[i].titulo || "<em>Sin título</em>"}
           </div>
           <div class="actions">
            <button id="show" data-my-id="${i}"> Ver</button> 
               <button class="edit" data-my-id="${i}">editar</button>
               <button id="delete" data-my-id="${i}">Borrar</button></li>
               
            </div>
        </div>\n`;
      i = i + 1;
    };

    view += `<div class="actions">
        </ul> <button id="new">Crear</button>
        <button id="reset" >Resetear</button></li>
            </div>`;

    return view;
};

const editView = (i, pelicula) => {
    return `<h2>Editar Película </h2>
        <div class="field">
        Título <br>
        <input  type="text" id="titulo" placeholder="Título" 
                value="${pelicula.titulo}">
        </div>
        <div class="field">
        Director <br>
        <input  type="text" id="director" placeholder="Director" 
                value="${pelicula.director}">
        </div>
        <div class="field">
        Miniatura <br>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                value="${pelicula.miniatura}">
        </div>
        <div class="actions">
            <button class="update" data-my-id="${i}">
                Actualizar
            </button>
            <button class="index">
                Volver
            </button>
       `;
}

const showView = (pelicula) => {
  

    return `
     <p>
         La pelicula <b> ${pelicula.titulo}</b>, fue diriguida por <b> ${pelicula.director}</b> 
     </p>
     <div class="actions">
        <button class="index">Volver</button>
     </div>`;
}

const newView = () => {
    

    return `
   <strong>Introducir el titulo de la nueva pelicula</strong><input type="text" id="titulo2"><br>
<strong>Introducir el director de la pelicula</strong><input type="text" id="director2"><br>
<strong>Introducir la foto de la pelicula</strong><input type="text" id="foto2"><br>

        <div class="actions">
        <button id="create">Añadir</button>
            <button class="index">Volver</button>
        </div>`;
}


// CONTROLADORES 
const indexContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById("main").innerHTML = showView(mis_peliculas[i]);

};

const newContr = () => {
    document.getElementById("main").innerHTML = newView();

};

const createContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    let titulo2 = document.getElementById("titulo2").value;
let director2 = document.getElementById("director2").value;
let foto2 = document.getElementById("foto2").value;

pelicula =  {titulo: titulo2,director:director2,miniatura: foto2 };
mis_peliculas.push(pelicula);
localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
indexContr();
};

const editContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    mis_peliculas[i].titulo    = document.getElementById('titulo').value;
    mis_peliculas[i].director  = document.getElementById('director').value;
    mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

const deleteContr = (i) => {
    let borrar = prompt("Estas seguro de borrar la mpeliculas creadas:(SI/NO)");
    if(borrar.toLowerCase() == "si"){
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    mis_peliculas.splice(i,1);
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
    }else {location.reload();}
};

const resetContr = () => {
    let borrar = prompt("Estas seguro de borrar la mpeliculas creadas:(SI/NO)");
    if(borrar.toLowerCase() == "si"){
    localStorage.clear(); 
    location.reload();
    }
    else {location.reload();}
    
};

// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener('click', ev => {
    if      (matchEvent(ev, '.index'))  indexContr  ();
    else if (matchEvent(ev, '.edit'))   editContr   (myId(ev));
    else if (matchEvent(ev, '.update')) updateContr (myId(ev));
    else if (ev.target.matches('#show'))  showContr(ev.target.dataset.myId);
    else if  (ev.target.matches('#new'))    newContr();
    else if (ev.target.matches('#create')) createContr();
    else if (ev.target.matches('#delete')) deleteContr(ev.target.dataset.myId);
    else if (ev.target.matches('#reset')) resetContr();
    
})
// Inicialización        
document.addEventListener('DOMContentLoaded', indexContr);
