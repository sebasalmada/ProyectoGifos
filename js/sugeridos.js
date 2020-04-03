////Cargar Gifs Sugeridos///

function sugeridosFinal() {
    for(i = 0; i < 4 ; i++) {
        if(JSON.parse(localStorage.ultimasBusquedas)[i] === "") {
            sugerenciasFinal[i] = arraySugerencias[i];
        } else {
            sugerenciasFinal[i] = JSON.parse(localStorage.ultimasBusquedas)[i];
        }
    }
}

async function sugeridos() {
    setLocalStorage();
    sugeridosFinal();
    for(i = 0; i < 4; i++){
        let url = "https://api.giphy.com/v1/gifs/search?q="
        let res = await fetch(url + sugerenciasFinal[i] + '&api_key=' + apiKey);
        let datos = await res.json();
        let objetoSugeridos = datos;
        arrayURLSugerencias[i] = objetoSugeridos.data;
        let imagenSugeridos = document.querySelectorAll(".item_sugeridos .gif_sugeridos img");
        imagenSugeridos[i].src = arrayURLSugerencias[i][0].images.fixed_height.url;
        let tituloSugeridos = document.querySelectorAll(".item_sugeridos .cabezal_sugeridos div");
        tituloSugeridos[i].innerText = "#" + sugerenciasFinal[i];
        aplicarTema();
    }
}

function verMas(numero) {
    const tituloBusqueda = document.querySelector(".tituloVerMas p");
    tituloBusqueda.innerText = sugerenciasFinal[numero] + " [resultado]";
    const estadoTituloBusqueda = document.querySelector(".tituloVerMas");
    estadoTituloBusqueda.style.display = "flex";
    const estadoVerMas = document.querySelector(".busquedaVerMasGif");
    estadoVerMas.style.display = "flex";
    for(var i = 0; i < arrayURLSugerencias[numero].length; i++) {
        const urlGif = arrayURLSugerencias[numero];
        const imagenNueva = document.querySelectorAll(".busquedaVerMasGif img");
        imagenNueva[i].src = urlGif[i].images.fixed_height.url;
    }
}

sugeridos();