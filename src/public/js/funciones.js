var nom;
var trai;
var elementoAbierto = null;

function abrir_sinopsis(nombre, descripcion, trailer) {
  // console.log(nombre, descripcion, trailer);
  nom = nombre;
  trai = trailer;
  document.getElementById("vent_info").style.display = "block";
  document.getElementById("Titulonombre").textContent = nombre;
  document.getElementById("descripcion").textContent = descripcion;
  document.getElementById("video").src = "https://www.youtube.com/embed/" + trailer + "?autoplay=0";

  //console.log("alto "+document.getElementById("vent_info").style.height);

}


function cerrar_sinopsis() {
  document.getElementById("vent_info").style.display = "none";
  document.getElementById("video").src = "";
}

function abrir_buscar() {
  elementoAbierto = document.getElementById("vent_buscar");
  mostrar();
}


function abrir_menu() {
  elementoAbierto = document.getElementById("ventana_menu");
  mostrar();
}

function abrir_genero() {
  elementoAbierto = document.getElementById("ventana_genero");
  mostrar();
}

function abir_mesage() {
  elementoAbierto = document.getElementById("ventana_mesage")
  mostrar();
}
function cerrar_mesage() {
  document.getElementById("ventana_mesage").style.display="none"
 
}
function showSiNo() {
  document.getElementById("alertSiNo").style.display = "block";
}
function ocultarSiNo() {
  document.getElementById("alertSiNo").style.display = "none";
}

function mostrar_getNombre() {
  document.getElementById("ventana_getNombre").style.display = "block";
}
function ocultar_getNombre() {
  document.getElementById("ventana_getNombre").style.display = "none";
}

function mostrar() {
  elementoAbierto.style.display = "block"
}


window.addEventListener('load', () => {// cuando ya carge los elementos html
  document.addEventListener('mouseup', function (e) {

    if (elementoAbierto!= null && !elementoAbierto.contains(e.target)) {
      elementoAbierto.style.display = 'none';
    }
    
    
  });

});