/**
 * Funcion que permite crear un elemento <div> el contenedor de peliculas
 * por medio de la creación de nodos.
 */
function showMoviesNodes(){
  let movies = JSON.parse(localStorage.getItem('peliculas'));
  const divMovies = document.querySelector('#list-div-movies');
  divMovies.innerHTML='';
  movies.forEach((pelicula, index) => {
      // Crear elementos de nodo 
      let tr = document.createElement('tr');
      let tdTitulo = document.createElement('td');
      let tdDescripcion = document.createElement('td');
      let tdAnio = document.createElement('td');
      let tdDuracion = document.createElement('td');
      let tdImagen= document.createElement('td');
      let tdButton = document.createElement('td');
      let button = document.createElement('button');
      let icon = document.createElement('i');
  
      // Configurar contenido y atributos
      tdTitulo.textContent = pelicula.titulo;
      tdDescripcion.textContent = pelicula.descripcion;
      tdAnio.textContent = pelicula.anio;
      tdDuracion.textContent = pelicula.duracion;
      tdImagen.innerHTML = `<img src="${pelicula.imagen}" alt="${pelicula.titulo}" width="30%">`;
      button.className = 'btn-cac';
      button.onclick = function() {
        deleteMovie(index);
      };
      icon.className = 'fa fa-trash';
  
      // Construir la estructura del nodo
      button.appendChild(icon);
      tdButton.appendChild(button);
  
      tr.appendChild(tdTitulo);
      tr.appendChild(tdDescripcion);
      tr.appendChild(tdAnio);
      tr.appendChild(tdDuracion);
      tr.appendChild(tdImagen);
  
      // Agregar la fila a la tabla
      tableMovies.appendChild(tr);
  });
}

/**
* Funcion que permite crear un elemento <tr> para la tabla de peliculas
* por medio del uso de template string de JS.
*/
function showMoviesTemplate(){
let movies = JSON.parse(localStorage.getItem('pelicuas'));
const tableMovies = document.querySelector('#list-table-movies tbody');
tableMovies.innerHTML='';
movies.forEach((pelicula, index) => {
  let tr = `<tr>
                <td>${pelicula.titulo}</td>
                <td>${pelicula.descripcion}</td>
                <td>${pelicula.anio}</td>
                <td>${pelicula.duracion}</td>
                <td><img src="${pelicula.imagen}" alt="${pelicula.titulo}" width="30%"></td>
                <td>
                  <button class="btn-cac" onclick='updateMovie(${pelicula.id})'><i class="fa fa-pencil" ></button></i>
                  <button class="btn-cac" onclick='deleteMovieAlert(${pelicula.id})'><i class="fa fa-trash" ></button></i>
                  </td>
              </tr>`;
  tableMovies.insertAdjacentHTML("beforeend",tr);
});
}

/**
* funcion que permite agregar o modificar una pelicula al listado de peliculas
* almacenado en el localstorage
*/
function saveMovie(){
const form = document.querySelector('#form-movie');

const inputId = document.querySelector('#id-movie');
const inputTitulo = document.querySelector('#titulo');
const inputDescripcion = document.querySelector('#descripcion');
const inputAnio = document.querySelector('#anio');
const inputDuracion = document.querySelector('#duracion');
const inputImagen = document.querySelector('#imagen-form');

if(inputTitulo.value !== '' && inputDescripcion.value !=='' && inputAnio.value !==''  && inputDuracion.value !=='' && inputImagen.value !==''){
  //Obtiene el listado de peliculas del localstorage, en caso de no existir crea una array vacio
  let movies = JSON.parse(localStorage.getItem('peliculas')) || [];
  
  if(inputId.value!==""){
    let movieFind = movies.find(movie => movie.id == inputId.value);
    if (movieFind) {
      movieFind.titulo = inputTitulo.value;
      movieFind.descripcion = inputDescripcion.value;
      movieFind.anio = inputAnio.value;
      movieFind.duracion = inputDuracion.value;
      movieFind.imagen = inputImagen.value;
    }
  }else{
    let nuevaPelicula = {
      id: Object.keys(movies).length+1,
      titulo: inputTitulo.value,
      descripcion: inputDescripcion.value,
      anio: inputAnio.value,
      duracion: inputDuracion.value,
      imagen: inputImagen.value,
    }
    movies.push(nuevaPelicula);
  }
  //Se actualiza el array de peliculas en el localstorage
  localStorage.setItem('peliculas',JSON.stringify(movies));
  showMoviesTemplate();
  //Limpieza de los campos del formulario
  // inputTitulo.value='';
  // inputDescripcion.value='';
  // inpuAnio.value='';
   // inpuDuracion.value='';
  // inputImagen.value='';
  form.reset();
  Swal.fire({
      title: '¡Exito!',
      text: 'Operacion exitosa.',
      icon: 'success',
      confirmButtonText: 'Cerrar'
  })
}else{
  Swal.fire({
      title: '¡Error!',
      text: 'Por favor completar todos los campos.',
      icon: 'error',
      confirmButtonText: 'Cerrar'
  });
}
}

/**
* Function que permite cargar el formulario para editar una pelicula
* de acuedo al id de la pelicula
* @param {number} movieId id movie que se va a actualizar
*/
function updateMovie(movieId){
let movies = JSON.parse(localStorage.getItem('peliculas'));
//se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
let movieToUpdate = movies.find(movie => movie.id===movieId);
if(movieToUpdate){
  const inputId = document.querySelector('#id-movie');
  const inputTitulo = document.querySelector('#titulo');
  const inputDescripcion = document.querySelector('#descripcion');
  const inputAnio = document.querySelector('#anio');
  const inputDuracion = document.querySelector('#duracion');
  const inputImagen = document.querySelector('#imagen-form');
  inputId.value = movieToUpdate.id;
  inputTitulo.value = movieToUpdate.titulo;
  inputDescripcion.value = movieToUpdate.descripcion;
  inputAnio.value = movieToUpdate.anio;
  inputDuracion.value = movieToUpdate.duracion;
  inputImagen.value = movieToUpdate.imagen;
}
}

/**
* Function que permite eliminar una pelicula del array del localstorage
* de acuedo al indice del mismo
* @param {number} movieId id movie que se va a eliminar
*/
function deleteMovie(movieId){
let movies = JSON.parse(localStorage.getItem('peliculas'));
//se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
let movieToDelete = movies.find(movie => movie.id===movieId);
if(movieToDelete){
  //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
  movies = movies.filter(movie => movie.id !== movieToDelete.id);
  //se actualiza el localstorage
  localStorage.setItem('movies',JSON.stringify(movies));
  showMoviesTemplate();
}
}

/**
* Function que permite eliminar una pelicula del array del localstorage
* de acuedo al indice del mismo por medio de sweet alert
* @param {number} movieId id movie que se va a eliminar
*/
function deleteMovieAlert(movieId){
let movies = JSON.parse(localStorage.getItem('movies'));
//se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
let movieToDelete = movies.find(movie => movie.id===movieId); 

if(movieToDelete){
    Swal.fire({
        title: "¿Está seguro que desea eliminar la pelicula?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then((result) => {
        if (result.isConfirmed) {
          //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
          movies = movies.filter(movie => movie.id !== movieToDelete.id);
          //se actualiza el localstorage
          localStorage.setItem('peliculas',JSON.stringify(movies));
          showMoviesTemplate();
          Swal.fire("¡Pelicula Eliminada!", "", "success");
        }
    });
}else{
    Swal.fire({
        title: '¡Error!',
        text: 'No se puede eliminar la pelicula.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    })
}
}


//Agregar eventos a elementos una vez que contenido haya sido cargado en el DOM
document.addEventListener('DOMContentLoaded', function() {
const btnSaveMovie = document.querySelector('#btn-save-movie');
btnSaveMovie.addEventListener('click',saveMovie);
});

//   showMoviesNodes();
showMoviesTemplate();
