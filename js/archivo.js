///Variables Iniciales///

var busqueda;
var valorBuscado;
var arrayUrls = [];
var arrayUrlsTendencias = [];
var apiKey = 'WWHwVrlvLD4S0KBfv7EOGdYCHYsQ8raN';
var themeActual = "day";
var arraySugerencias = ['Cat', 'Messi', 'MadMen', 'Run'];
var ultimasBusquedas = ["", "", "", ""];
var URLultimasBusquedas = ["", "", "", ""];
var sugerenciasFinal = ["", "", "", ""];
var numeroBusqueda = 0;
var cantidadVacios = 0;
var arrayURLSugerencias = [[],[],[],[]];
var ratioTrends = [];
var tresBusquedas = [];


////Captar la Busqueda///

function captaBusqueda() {
    valorBuscado = document.querySelector(".ingresa_busqueda").value;
}

///Busqueda///

async function giphySearch(search) {
    let url = "https://api.giphy.com/v1/gifs/search?q="
    const res = await fetch(url + search + '&api_key=' + apiKey);
    const datos = await res.json();
    return datos;
}

function getUrls(x) {
    for(i = 0; i < x.length; i++ ) {
        arrayUrls.push(x[i].images.fixed_height.url);
    }
    return arrayUrls;
    }

function resultadoBuscar(search) {
    lupaOriginal();
    arrayUrls = [];
    const resultado = giphySearch(search);
    resultado.then((respuesta) => {
    busqueda = respuesta.data;
    return busqueda;
    })
    .then((respuesta) => {
        const resp = getUrls(respuesta);
        return resp;
    })
    .then ((respuesta) => {
        esconderMenuBuscar();
        mostrarResultadosBuscar();
        const tituloBusqueda = document.querySelector(".tituloBusqueda p");
        tituloBusqueda.innerText = valorBuscado + " [resultado]";
        const estadoTituloBusqueda = document.querySelector(".tituloBusqueda");
        estadoTituloBusqueda.style.display = "flex";
        for(var i = 0; i < respuesta.length; i++) {
            const urlGif = respuesta[i];
            const imagenNueva = document.querySelectorAll(".busquedaGif img");
            imagenNueva[i].src = urlGif;
        }
        ultimasBusquedas = JSON.parse(localStorage.ultimasBusquedas)
        sugeridosFinal();
        let c = 0;
        for(i = 0; i < 4; i++) {
            if(sugerenciasFinal[i].toLowerCase() === valorBuscado.toLowerCase()) {
                c ++;
            };
        }
        console.log(c);
        if(c === 0) {
            ultimasBusquedas[numeroBusqueda] = valorBuscado;
            numeroBusqueda ++;
        }
        localStorage.setItem('ultimasBusquedas', JSON.stringify(ultimasBusquedas));
        console.log(ultimasBusquedas);
        if(numeroBusqueda === 4) {
            numeroBusqueda = 0;
        }
    })
}

function resultadoParcialBuscar() {
    tresBusquedas = []
    const resultado = giphySearch(valorBuscado);
    resultado.then((respuesta) => {
    busqueda = respuesta.data;
    return busqueda;
    })
    .then((respuesta) => {
        let titulos = document.querySelectorAll(".resultadoBusqueda div");
        for(i = 0; i < 3; i++) {
            tresBusquedas.push(respuesta[i].title);
            titulos[i].innerText = tresBusquedas[i];
        }
    })
    
}


///Set Local Storage///

function setLocalStorage() {
    if(localStorage.ultimasBusquedas === undefined) {
        localStorage.setItem('ultimasBusquedas', JSON.stringify(["", "", "", ""]));
        localStorage.setItem('URLultimasBusquedas', JSON.stringify(["", "", "", ""]))
        localStorage.setItem('cantidadVisitas', 0)
    }
    for(var i = 0; i < 4; i++) {
        if(JSON.parse(localStorage.ultimasBusquedas)[i] === ""){
            cantidadVacios ++;
        }
    }
    numeroBusqueda = 4 - cantidadVacios;
    if(numeroBusqueda === 4) {
        numeroBusqueda = 0;
    }
}


//Desplegar y Esconder Menu Elegir Tema//

function mostrarMenu() {
    const estadoMenu = document.querySelector(".menudesplegable");
    estadoMenu.style.display = "block";
}

function esconderMenu() {
    const estadoMenu = document.querySelector(".menudesplegable");
    estadoMenu.style.display = "none";
}

///Mostrar y Esconder Menú Buquedas Relacionadas//

function mostrarMenuBuscar() {
    const estadoMenuBuscar = document.querySelector(".resultadoBusqueda");
    estadoMenuBuscar.style.display = "block";
    const botonBuscarVisitado = document.querySelector("form a");
    if(themeActual === "day"){
        botonBuscarVisitado.style.color = "#110038";
        botonBuscarVisitado.style.background = "#F7C9F3 100%";
        botonBuscarVisitado.style.border = "1px solid #110038";
        botonBuscarVisitado.style.boxShadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF";
    } else {
        botonBuscarVisitado.style.color = "#FFFFFF";
        botonBuscarVisitado.style.background = "#EE3EFE";
        botonBuscarVisitado.style.border = "1px solid #110038";
        botonBuscarVisitado.style.boxShadow = "inset -1px -1px 0 0 #A72CB3, inset 1px 1px 0 0 #FFFFFF";
    }
}

function esconderMenuBuscar() {
    const estadoMenuBuscar = document.querySelector(".resultadoBusqueda");
    estadoMenuBuscar.style.display = "none";
    const botonBuscarVisitado = document.querySelector("form a");
    if(themeActual === "day"){
        botonBuscarVisitado.style.color = "#B4B4B4";
        botonBuscarVisitado.style.background = "#E6E6E6";
        botonBuscarVisitado.style.border = "1px solid #808080";
        botonBuscarVisitado.style.boxShadow = "inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF";
    } else {
        botonBuscarVisitado.style.color = "#8F8F8F";
        botonBuscarVisitado.style.background = "#B4B4B4";
        botonBuscarVisitado.style.border = "1px solid #808080";
        botonBuscarVisitado.style.boxShadow = "inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF";
    }
}


///Mostrar los Resultados Búsqueda///

function mostrarResultadosBuscar() {
    const estadoMenuBuscar = document.querySelector(".busquedaGif");
    estadoMenuBuscar.style.display = "flex";
    document.querySelector(".ingresa_busqueda").value = "";
}

function esconderResultadosBuscar() {
    const estadoMenuBuscar = document.querySelector(".busquedaGif");
    estadoMenuBuscar.style.display = "none";
}


///Cambio de Theme///

function changeThemeDay() {
    const scriptTheme = document.querySelectorAll('link')[4];
    const logo = document.querySelector(".logo img");
    const lupa = document.querySelector("#lupa");
    const textoNight = document.querySelector(".sailornight");
    const textoDay = document.querySelector(".sailorday");
    scriptTheme.href = "./css/styles.css";
    logo.src = "./imgs/gifOF_logo.png";
    lupa.src = "./imgs/lupa_inactive.svg";
    textoNight.innerHTML = "Sailor Night"
    textoDay.innerHTML = "<u>S</u>ailor Day"
    themeActual = "day";
    localStorage.setItem('theme', themeActual);
    esconderMenu();
    esconderMenuBuscar();
}

function changeThemeNight() {
    const scriptTheme = document.querySelectorAll('link')[4];
    const logo = document.querySelector(".logo img");
    const lupa = document.querySelector("#lupa");
    const textoNight = document.querySelector(".sailornight");
    const textoDay = document.querySelector(".sailorday");
    scriptTheme.href = "./css/styles2.css";
    logo.src = "./imgs/gifOF_logo_dark.png";
    lupa.src = "./imgs/Combined_Shape.svg";
    textoNight.innerHTML = "<u>S</u>ailor Night"
    textoDay.innerHTML = "Sailor Day"
    themeActual = "night";
    localStorage.setItem('theme', themeActual);
    esconderMenu();
    esconderMenuBuscar();
}

///Chequear Theme///

function aplicarTema() {
    if(localStorage.theme !== undefined) {
        themeActual = localStorage.theme
    } 
    if(themeActual === 'night') {
        changeThemeNight();
    }
  };


///Estado link Mis Guifos///

function misguifosHome() {
        localStorage.setItem('paginaMisGuifos', true);
}

function crearGuifos() {
    localStorage.setItem('paginaMisGuifos', false);
}

///Cambiar Lupa al estar Buscando///

function lupa() {
    let elementoLupa = document.querySelector('#lupa');
    if(themeActual === "day") {
        elementoLupa.src = "./imgs/lupa.svg";
    } else {
        elementoLupa.src = "./imgs/lupa_light.svg";
    }
}

function lupaOriginal() {
    let elementoLupa = document.querySelector('#lupa');
    if(themeActual === "day") {
        elementoLupa.src = "./imgs/lupa_inactive.svg";
    } else {
        elementoLupa.src = "./imgs/Combined_Shape.svg";
    }
}


///Busqueda en Tiempo Real///

function escuchaIngreso() {
    let ingresoBusqueda = document.querySelector("form input");
    ingresoBusqueda.addEventListener('keyup', () => {
    lupa();
    captaBusqueda();
    mostrarMenuBuscar();
    resultadoParcialBuscar();
    if(valorBuscado === "") {
        esconderMenuBuscar();
        lupaOriginal();
    }
})
}

function buscando(sugerido) {
    let buscar = tresBusquedas[sugerido];
    resultadoBuscar(buscar);
}


///Actualizar Contador de Visitas///

function actualizarVisitas() {
    let cantidadActual = JSON.parse(localStorage.cantidadVisitas);
    cantidadActual ++
    localStorage.setItem('cantidadVisitas', cantidadActual);
    const visitas = document.querySelector(".stripe div p");
    visitas.innerText = '¡Bienvenidos/as a Guifos.com! ——————Donde los gifs están.////// Número de visitas: ' + cantidadActual;
}


///Carga inicial en el window///

window.onload = function() {
    escuchaIngreso();
    actualizarVisitas();
  };

