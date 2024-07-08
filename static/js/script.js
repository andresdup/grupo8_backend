// Definimos las opciones disponibles para cada categoría
const generos = {
    accion: ["El secreto de sus ojos", "Argentina 1985", "Carancho", "Nueve reinas", "Relatos salvajes", "El hijo de la novia"],
    comedia: ["Esperando la carroza", "Un novio para mi mujer", "Fuga de cerebros", "Dos más dos", "Corazón de león"],
    drama: ["El clan", "El hijo de la novia", "Medianeras", "La historia oficial", "La ciénaga"],
    terror: ["Los que aman, odian", "Los olvidados", "La memoria del agua", "Mundo al revés", "La casa muda"],
    romance: ["El amor menos pensado", "Elsa y Fred", "Sidewalls", "Medianeras", "Viudas"]
};

const estadosDeAnimo = {
    feliz: ["El clan", "El clan", "El clan"],
    nostalgico: ["Un novio para mi mujer", "Un novio para mi mujer", "Un novio para mi mujer"],
    emocionado: ["Mundo al revés", "Mundo al revés", "Mundo al revés"],
    relajado: ["Los olvidados", "Los olvidados", "Los olvidados"]
};

const ocasiones = {
    noche_romantica: ["Nueve reinas", "Nueve reinas", "Nueve reinas"],
    noche_de_lluvia: ["Fuga de cerebros", "Fuga de cerebros", "Fuga de cerebros"],
    noche_de_terror: ["Los que aman, odian", "Los olvidados", "La memoria del agua"]
};

// Función para generar ideas basadas en las selecciones del usuario
function generarIdeas() {
    const generoSeleccionado = document.getElementById("genero").value;
    const estadoDeAnimoSeleccionado = document.getElementById("estado_de_animo").value;
    const ocasionSeleccionada = document.getElementById("ocasion").value;

    const pelicula = obtenerPelicula(generoSeleccionado, estadoDeAnimoSeleccionado, ocasionSeleccionada);
    const aperitivo = obtenerAperitivo(generoSeleccionado);
    const actividad = obtenerActividad(ocasionSeleccionada);

    // Mostramos el resultado en la página
    document.getElementById("pelicula").innerHTML = "<strong>Película:</strong> " + pelicula;
    document.getElementById("aperitivo").innerHTML = "<strong>Aperitivo:</strong> " + aperitivo;
    document.getElementById("actividad").innerHTML = "<strong>Actividad:</strong> " + actividad;

    // Mostramos la sección de resultado
    document.getElementById("resultado").style.display = "block";
}

// Función para obtener una película aleatoria basada en las selecciones del usuario
function obtenerPelicula(genero, estadoDeAnimo, ocasion) {
    let opciones = [];
    opciones = opciones.concat(generos[genero], estadosDeAnimo[estadoDeAnimo], ocasiones[ocasion]);
    opciones = opciones.filter(pelicula => !["accion", "comedia", "drama", "terror", "romance"].includes(pelicula));
    return opciones[Math.floor(Math.random() * opciones.length)];
}

// Función para obtener un aperitivo aleatorio basado en el género seleccionado
function obtenerAperitivo(genero) {
    switch (genero) {
        case "accion":
            return "Saladix y otro snack";
        case "accion":
            return "Pochoclos salados";
        case "comedia":
            return "Pochoclos";
        case "drama":
            return "picada";
        case "terror":
            return "Oreos y Helado";
        case "romance":
            return "Champagne y sushi";
        default:
            return "Velas y helado";
    }
}

// Función para obtener una actividad temática basada en la ocasión seleccionada
function obtenerActividad(ocasion) {
    switch (ocasion) {
        case "noche_romantica":
            return "Disfrutar de la pelicula";
        case "noche_de_lluvia":
            return "Disfrutar de la pelicula";
        case "noche_de_terror":
            return "Disfrutar de la pelicula";
        default:
            return "Disfrutar de la película";
    }
}

