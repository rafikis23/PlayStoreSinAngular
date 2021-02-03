var aplicaciones = [];

//
var localStorage = window.localStorage;
var indiceAppSeleccionada = null;

if(localStorage.getItem('aplicaciones') == '') {
    localStorage.setItem('aplicaciones', JSON.stringify(aplicaciones)); //de JSON a cadena;
} else {
    aplicaciones = JSON.parse(localStorage.getItem('aplicaciones'));
}// de cadena a JSON;

for (let i=1; i<=32; i++) {
    document.getElementById('lista-imagenes').innerHTML +=
        `<option value="img/app-icons/${i}.webp">Imagen ${i}</option>`;
}
for (let i=1; i<=3; i++) {
    document.getElementById('lista-screens').innerHTML +=
        `<option value="img/app-screenshots/${i}.webp"> Screens ${i}</option>`;
}
function generarAplicaciones() {
    document.getElementById('aplicaciones').innerHTML = '';
    aplicaciones.forEach(function(app, i){
        let estrellas = '';
        for(let i=0; i<app.calificacion; i++){
            estrellas += '<i class="fas fa-star"></i>'; 
        }
        
        for(let i=0; i<(5-app.calificacion); i++){
            estrellas += '<i class="far fa-star"></i>'; 
        }
        

        document.getElementById('aplicaciones').innerHTML += 
            `<div class="  col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div class="card  border border-warning" >
                    <img src="${app.urlImagen}" class="card-img-top app-img" onclick="instalarApp(${i})">
                    <div class="card-body app-body ">
                        <h5 class="card-title">${app.nombreAplicacion}</h5>
                        <p class="card-text">${app.desarrollador}</p>
                        <div>
                            ${estrellas}
                        </div>
                        <h5 class="card-title">$${app.precio}</h5>
                        <button class="btn-outline-warning btn-sm" style="float:left" onclick="editarApp(${i})"><i class="far fa-edit"></i></button>
                        <button class="btn-outline-primary btn-sm" style="float:center" onclick="comentarApp(${i})"><i class="fas fa-comments"></i></button>
                        <button class="btn-outline-danger btn-sm" style="float:right" onclick="eliminar(${i})"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>`;    
    });

    
}

generarAplicaciones();

function validarCampoVacio (id) {
    let campo = document.getElementById(id);
    if (campo.value == '') {
        campo.classList.remove('input-success');
        campo.classList.add('input-error');
    } else {
        campo.classList.remove('input-error');
        campo.classList.add('input-success');
    }

}

function guardar(){
   const app = {
        categoria: document.getElementById('categoria-app').value,
        codigo: document.getElementById('codigo-app').value ,
        nombreAplicacion: document.getElementById('nombre-app').value ,
        precio: document.getElementById('precio-app').value ,
        descripcion: document.getElementById('descripcion-app').value ,
        urlImagen: document.getElementById('lista-imagenes').value ,
        apk: document.getElementById('apk-app').value ,
        calificacion: document.getElementById('calificacion-app').value ,
        numeroDescargas: document.getElementById('descargas-app').value ,
        desarrollador: document.getElementById('desarrollador-app').value,
        urlScreens: document.getElementById('lista-screens').value ,
        comentarios:[{
            usuario: '',
            fecha: '',
            calificacionComentario:  '',
            comentario: '',

        }]

    };

    aplicaciones.push(app);
    localStorage.setItem('aplicaciones', JSON.stringify(aplicaciones));

    generarAplicaciones();

    console.log(aplicaciones);
    $('#modalNuevaApp').modal('hide');

    
    
}

function eliminar(indice) {
    console.log('Eliminar aplicacion con el indice', indice);
    aplicaciones.splice(indice, 1);
    generarAplicaciones();
    localStorage.setItem('aplicaciones', JSON.stringify(aplicaciones));
}

function editarApp(indice) {
    console.log('Editar la aplicacion', indice);
    indiceAppSeleccionada = indice;
    $('#modalNuevaApp').modal('show');
    let app = aplicaciones[indice];
     document.getElementById('categoria-app').value = app.categoria;
     document.getElementById('codigo-app').value = app.codigo;
     document.getElementById('nombre-app').value = app.nombreAplicacion;
     document.getElementById('precio-app').value = app.precio;
     document.getElementById('descripcion-app').value = app.descripcion;
     document.getElementById('lista-imagenes').value = app.urlImagen;
     document.getElementById('apk-app').value = app.apk;
     document.getElementById('calificacion-app').value = app.calificacion;
     document.getElementById('descargas-app').value = app.numeroDescargas;
     document.getElementById('desarrollador-app').value = app.desarrollador;
     document.getElementById('lista-screens').value = app.urlScreens;


    document.getElementById('btn-guardar').style.display = 'none';
    document.getElementById('btn-actualizar').style.display = 'block';
    
}
function comentarApp(indice) {
    console.log('Comentar la aplicacion', indice);
    indiceAppSeleccionada = indice;
    $('#modalComentario').modal('show');


}

function actualizar(){
    console.log('Se actualizo el app con indice', indiceAppSeleccionada);
    aplicaciones[indiceAppSeleccionada] = {
        categoria: document.getElementById('categoria-app').value,
        codigo: document.getElementById('codigo-app').value ,
        nombreAplicacion: document.getElementById('nombre-app').value ,
        precio: document.getElementById('precio-app').value ,
        descripcion: document.getElementById('descripcion-app').value ,
        urlImagen: document.getElementById('lista-imagenes').value ,
        apk: document.getElementById('apk-app').value ,
        calificacion: document.getElementById('calificacion-app').value ,
        numeroDescargas: document.getElementById('descargas-app').value ,
        desarrollador: document.getElementById('desarrollador-app').value,
        urlScreens: document.getElementById('lista-screens').value ,

        
    }
    generarAplicaciones();
    localStorage.setItem('aplicaciones', JSON.stringify(aplicaciones));
    $('#modalNuevaApp').modal('hide');
}
function nuevaApp() {
    indiceAppSeleccionada = null;
    document.getElementById('categoria-app').value = null;
    document.getElementById('codigo-app').value = null;
    document.getElementById('nombre-app').value = null;
    document.getElementById('precio-app').value = null;
    document.getElementById('descripcion-app').value = null;
    document.getElementById('lista-imagenes').value = null;
    document.getElementById('apk-app').value = null;
    document.getElementById('calificacion-app').value = null;
    document.getElementById('descargas-app').value = null;
    document.getElementById('desarrollador-app').value = null;
    document.getElementById('lista-screens').value = null;

    document.getElementById('btn-guardar').style.display = 'block';
    document.getElementById('btn-actualizar').style.display = 'none';
}

function enviarComentario(indice){
    indiceAppSeleccionada = indice;

    
    
    /*document.getElementById('usuario-comentario-app').value = aplicaciones[indice].comentarios[usuario];
    document.getElementById('fecha-comentario-app').value = aplicaciones[indice].comentarios[fecha];
    document.getElementById('calificacion-comentario-app').value = aplicaciones[indice].comentarios[calificacionComentario];
    document.getElementById('comentario-app').value = aplicaciones[indice].comentarios[comentario];
    */
    //comentario = app.comentarios;
       
    //aplicaciones[indice].push(app);
    //localStorage.setItem('aplicaciones', JSON.stringify(aplicaciones));

    //generarAplicaciones();

    
    //console.log('Los comentarios listados son:', comentarios);
    $('#modalComentario').modal('hide');
    
    
    
}

function instalarApp(indice){
    indiceAppSeleccionada = indice;
    
    document.getElementById('aplicaciones').innerHTML = '';
    $('#modalInstalarApp').modal('show');
    aplicaciones.forEach(function(app, i){
        let estrellas = '';
        for(let i=0; i<app.calificacion; i++){
            estrellas += '<i class="fas fa-star"></i>'; 
        }
        
        for(let i=0; i<(5-app.calificacion); i++){
            estrellas += '<i class="far fa-star"></i>'; 
        }
    
    
    document.getElementById('aplicaciones').innerHTML +=
    //<!-- Modal Instalar App -->
    `<div class="modal fade" id="modalInstalarApp" tabindex="-1" aria-labelledby="modalInstalarAppLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="img/app-screenshots/1.webp" class="d-block w-100" >
                            </div>
                            <div class="carousel-item">
                                <img src="img/app-screenshots/2.webp" class="d-block w-100" >
                            </div>
                            <div class="carousel-item">
                                <img src="img/app-screenshots/3.webp" class="d-block w-100" >
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <h5 class="modal-title" id="modalInstalarAppLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="img/app-icons/${i}.webp" class="card-img" >
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${app.nombreAplicacion}</h5>
                                    <p class="card-text">${app.desarrollador}</p>
                                    <p class="card-text"><small class="text-muted">${app.descripcion}</small></p>
                                    <h6 class="card-title">${app.precio}</h6>
                                </div>
                                <div>
                                    ${estrellas}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Instalar</button>
                </div>
            </div>
        </div>
    </div>`;
    $('#modalInstalarApp').modal('show');
    
    })
}