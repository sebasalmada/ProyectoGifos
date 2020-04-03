var urlTendencias = 'https://api.giphy.com/v1/gifs/trending?api_key=';


///Busqueda Tendencias///

async function buscarTendencias() {
    const respuesta = await fetch(urlTendencias + apiKey);
    const datos = await respuesta.json();
    return datos;
}

var tendencias = buscarTendencias();

tendencias
.then(function(resp) {
    resultado = resp.data;
    return resultado;
})
.then(function(resp){
    for(i = 0; i < resp.length; i++ ) {
        arrayUrlsTendencias.push(resp[i].images.fixed_height.url);
        const ratio = resp[i].images.fixed_height.width / resp[i].images.fixed_height.height;
        let newratio = 0
        if(ratio >= 1.5) {
            newratio = 2
        } else {
            newratio = 1
        }
        ratioTrends.push(newratio);
    }
    for(var i = 0; i < arrayUrlsTendencias.length; i++) {
        const urlGifTendencias = arrayUrlsTendencias[i];
        const imagenNuevaTendencias = document.querySelectorAll(".resultadoTendencias img");
        imagenNuevaTendencias[i].src = urlGifTendencias;
    }
})