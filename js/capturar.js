///Inicializar Variables///

var recorder = {};
var blob
var postURL = 'http://upload.giphy.com/v1/gifs';
var themeUpload = "day";
var URLgifGrabado = "";
var arrayMisGuifos = [];
var gifID = "";
var URLmisGuifos = [];
var max_i = 1;
var urlGifoFinal = "hola";
var urlGifoDownload = "";
var cronometro;


///SET MisGuifos///

function setMisGuifos() {
    if(localStorage.misGuifos == undefined){
        localStorage.setItem('misGuifos', JSON.stringify(arrayMisGuifos));
    } else {
        arrayMisGuifos = JSON.parse(localStorage.misGuifos);
    }

    for(var i = 0; i < arrayMisGuifos.length; i++) {
        let urlGif = 'http://media3.giphy.com/media/' + arrayMisGuifos[i] + '/giphy.gif?cid=1a216cfcd6600562cb89382378d38a7e52e97956f5e90061&rid=giphy.gif';
        let imagenNueva = document.querySelectorAll(".desplegarMisGuifos img");
        imagenNueva[i].src = urlGif;
    }
}


///Esconder Menu///

function apagarMenu() {
    if(localStorage.paginaMisGuifos === "true") {
        let menu = document.querySelector(".menu");
        menu.style.display = "flex";
        misguifos();
    } else {
        let menu = document.querySelector(".menu");
        menu.style.display = "none";
        let ocultar_creargifs = document.querySelector(".crearguifos");
        ocultar_creargifs.style.display = "flex";
    }
}


///Cambio de Theme///

function changeUploadDay() {
    const scriptTheme = document.querySelectorAll('link')[4];
    const logo = document.querySelector("#logocolor");
    const textoNight = document.querySelector(".sailornight");
    const textoDay = document.querySelector(".sailorday");
    scriptTheme.href = "./css/styles.css";
    logo.src = "./imgs/gifOF_logo.png";
    textoNight.innerHTML = "Sailor Night"
    textoDay.innerHTML = "<u>S</u>ailor Day"
    themeActual = "day";
    localStorage.setItem('theme', themeActual);
    esconderMenu();
}

function changeUploadNight() {
    const scriptTheme = document.querySelectorAll('link')[4];
    const logo = document.querySelector("#logocolor");
    const textoNight = document.querySelector(".sailornight");
    const textoDay = document.querySelector(".sailorday");
    scriptTheme.href = "./css/styles2.css";
    logo.src = "./imgs/gifOF_logo_dark.png";
    textoNight.innerHTML = "<u>S</u>ailor Night"
    textoDay.innerHTML = "Sailor Day"
    themeActual = "night";
    localStorage.setItem('theme', themeActual);
    esconderMenu();
}

function checkTheme() {
    if(localStorage.theme == "night") {
        let scriptTheme = document.querySelectorAll('link')[4];
        const logo = document.querySelector("#logocolor");
        const textoNight = document.querySelector(".sailornight");
        const textoDay = document.querySelector(".sailorday");
        scriptTheme.href = "./css/styles2.css";
        logo.src = "./imgs/gifOF_logo_dark.png";
        textoNight.innerHTML = "<u>S</u>ailor Night"
        textoDay.innerHTML = "Sailor Day"
        themeActual = "night";
        localStorage.setItem('theme', themeActual);
    }
}

///Definir MisGuifos///

function arrayMisGuifosFinal() {
        if(JSON.parse(localStorage.misGuifos)[0] === "") {
            sugerenciasFinal[i] = arraySugerencias[i];
        } else {
            sugerenciasFinal[i] = JSON.parse(localStorage.ultimasBusquedas)[i];
        }
}

///Grabar Gif///

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
       audio: false,
       video: { width: 1280, height: 440} 
    })
     .then(function(stream) {
        var video = document.querySelector('video');
        video.srcObject = stream;
        video.play();
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            height: 188,
            hidden: 260,
            onGifRecordingStarted: function() {
              console.log('started')
            }
        });
  })
}


function comenzar() {
    let capturador = document.querySelector(".capturar");
    capturador.style.display = "flex";
    let ocultar_creargifs = document.querySelector(".crearguifos");
    ocultar_creargifs.style.display = "none";
    getStreamAndRecord();
    if(themeActual === "night") {
        let camara = document.querySelector(".boton_crearguifos3 img");
        camara.src = "./imgs/camera_light.svg";
    }
}

function capturar() {
    micronometro();
    recorder.startRecording();
    let capturador = document.querySelector(".botones_capturar");
    capturador.style.display = "none";
    let listo = document.querySelector(".chequeo");
    listo.style.display = "flex";
    let titulo = document.querySelector(".titulo_capturar");
    titulo.innerHTML = "Capturando Tu Guifo"
    if(themeActual === "night") {
        let camara = document.querySelector(".boton_crearguifos4 img");
        camara.src = "./imgs/recording_dark.svg";
    }

}

function frenar() {
    clearInterval(cronometro);
    recorder.stopRecording();
    blob = recorder.getBlob();
    let capturador = document.querySelector(".capturar");
    capturador.style.display = "none";
    let preview = document.querySelector('.preview');
    preview.style.display = "flex";
    let gif_preview = document.querySelector('.previewGif')
    gif_preview.src = URL.createObjectURL(blob);
    URLgifGrabado = URL.createObjectURL(blob);
}

function repetirCaptura() {
    clearInterval(cronometro);
    let preview = document.querySelector('.preview');
    preview.style.display = "none";
    recorder.reset();
    let capturador = document.querySelector(".capturar");
    capturador.style.display = "flex";
    let ocultar_creargifs = document.querySelector(".botones_capturar");
    ocultar_creargifs.style.display = "flex";
    let listo = document.querySelector(".chequeo");
    listo.style.display = "none";
    let titulo = document.querySelector(".titulo_capturar");
    titulo.innerHTML = "Un chequeo antes de empezar";

}



///subir video///

function cargarestante() {
    setTimeout(() => {
        let falta = (23 / 2) - 0.5 * (max_i - 1);
        let cuadrado = document.getElementsByClassName('sincargar');
        cuadrado[0].className = 'cargado';
        let segundoscarga = document.querySelector('.tiemporestante p');
        segundoscarga.innerHTML = 'Tiempo restante: ' + falta + ' segundos'
        max_i ++;
        if(max_i <= 23) {
            cargarestante();
        }
    }, 400);    
}

function limpiarCarga() {
    for(let i = 1; i <= 23; i++) {
        let cuadrado_limpiar = document.getElementsByClassName('cargado');
        cuadrado_limpiar[0].className = 'sincargar';
    }
}

function upload() {
    let form = new FormData();
    form.append('file', blob, 'myGif.gif');
    console.log(form.get('file'));
    let url = postURL + '?api_key=aqoHTm5DoLYal84b93NzgBBIfGNr8M4B';
    fetch(url, {
        method: 'POST',
        body: form
    })
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        gifID = res;
        console.log(gifID);
    })
    
    .then(function(){
        let preview = document.querySelector('.preview');
        preview.style.display = "none";
        let subiendo = document.querySelector('.subiendo');
        subiendo.style.display = "flex";
        let gif_preview = document.querySelector('.previewGifListo img')
        gif_preview.src = URL.createObjectURL(blob);
        arrayMisGuifos.push(gifID.data.id);
        let posicion = arrayMisGuifos.length - 1;
        let id = arrayMisGuifos[posicion];
        urlGifoDownload = 'https://giphy.com/gifs/' + id;
        urlGifoFinal = 'https://media.giphy.com/media/' + id + '/giphy.gif'
        if(localStorage.misGuifos == undefined){
                localStorage.setItem('misGuifos', JSON.stringify(arrayMisGuifos));
            } else {
                arrayMisGuifos = JSON.parse(localStorage.misGuifos);
                arrayMisGuifos.push(gifID.data.id);
                localStorage.setItem('misGuifos', JSON.stringify(arrayMisGuifos));
            }
        cargarestante();
        setTimeout(function(){
            let subiendo = document.querySelector('.subiendo');
            subiendo.style.display = "none";
            let exito = document.querySelector('.exito');
            exito.style.display = "flex";
            for(let i = 0; i < arrayMisGuifos.length; i++) {
                let urlGif = 'http://media3.giphy.com/media/' + arrayMisGuifos[i] + '/giphy.gif?cid=1a216cfcd6600562cb89382378d38a7e52e97956f5e90061&rid=giphy.gif';
                let imagenNueva = document.querySelectorAll(".desplegarMisGuifos img");
                imagenNueva[i].src = urlGif;
            }
            }, 9200) 
        })
}

function cancelar() {
    window.location.href='/index.html'
}

function listo() {
    limpiarCarga();
    window.location.href='/upload.html'
}


///Mis Guifos///

function misguifos() {
    let crearguifos = document.querySelector('.crearguifos');
    crearguifos.style.display = "none";
}


///Copiar Gif Subido///

function copiarGifo() {
    let copiar = document.querySelector("#copiarGifo");
    copiar.addEventListener('click', () => {
        let cantidadMisGuifos = arrayMisGuifos.length - 1
        let urlCopia = 'https://media.giphy.com/media/' + arrayMisGuifos[cantidadMisGuifos] + '/giphy.gif';
        const element = document.createElement('textarea');
        element.value = urlCopia;
        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element); 
    })
}

///Descargar Gif Creado///

function descargarGifo() {
    let descargar = document.querySelector("#descargarGifo");
    descargar.addEventListener('click', () => {
        let cantidadMisGuifos = arrayMisGuifos.length - 1
        let urldescarga = 'https://giphy.com/gifs/' + arrayMisGuifos[cantidadMisGuifos];
        window.open(urldescarga, '_blank');
    })
}

///Actualizar Contador de Visitas///

function actualizarVisitasUpload() {
    let cantidadActual = JSON.parse(localStorage.cantidadVisitas);
    const visitas = document.querySelector(".stripe div p");
    visitas.innerText = '¡Bienvenidos/as a Guifos.com! ——————Donde los gifs están.////// Número de visitas: ' + cantidadActual;
}

///Carga de Página///

window.onload = function() {
    apagarMenu();
    checkTheme();
    setMisGuifos();
    descargarGifo();
    copiarGifo();
    actualizarVisitasUpload();
  }

///Cronometro///

  function micronometro() {
      let minutos = 0;
      let segundos = 0;
      let decimas = 0;
      let min = document.getElementById('minutos');
      let seg = document.getElementById('segundos');
      let dec = document.getElementById('decimas');
      min.innerText = "00";
      seg.innerText = "00";
      dec.innerText = "00";
      cronometro = setInterval(function() {
          if(decimas == 10) {
              decimas = 0;
              segundos++;
              if(segundos == 60) {
                segundos = 0;
                minutos ++
                if(minutos < 10) {
                  min.innerText = "0" + minutos;
                } else {
                  min.innerText = minutos;
                }
                }
              if(segundos < 10) {
                seg.innerText = "0" + segundos;
              } else {
                seg.innerText = segundos;
              }
          }
          if(decimas < 10) {
            dec.innerText = "0" + decimas;
          } else {
            dec.innerText = decimas;
          }
          decimas++;
      }, 100)
  }