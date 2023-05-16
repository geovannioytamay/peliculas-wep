/*
var pelis_Select = [];

this.fetch("/peliculas/pedidos")
.then(pedidos=>{
  console.log("pedi: "+pedidos.json()); 
})
.then(data =>{
  pelis_Selec=data;
 
});


*/
function ponerPeso(id_pelicula, idDiv){
  var divPeso= document.getElementById(id_pelicula+idDiv);
  divPeso.innerHTML = covertidor(idDiv);
}

function covertidor(peso) {
  Math.floor(peso);
  var MB = 0;
  var GB = 0;
  var TB = 0;
  MB = peso / (1024 * 1024);
  GB = MB / 1024;
  TB = GB / 1024;

  if (MB < 1024) {
      return MB.toFixed(0)+" MB" ;
  }
  if (GB < 1024) {
      return GB.toFixed(2)+" GB"
  }
  if (TB < 1024) {
      return TB.toFixed(3);+" TB"
  }

  return "";
}
function iniciar() {
  localStorage.clear();
  document.getElementById("iniciar").action = "/iniciar"
  document.getElementById("iniciar").submit();

}
function registrar() {
  if (compararContrasena()) {
    document.getElementById("registrar").action = "/registrar"
    document.getElementById("registrar").submit();
  }
}



function compararContrasena() {
  var nombre = document.getElementById("nombre").value;
  var usuario = document.getElementById("usuario").value;
  var telefono = document.getElementById("telefono").value;
  var contrasena = document.getElementById("contrasena").value;
  var contrasenatwu = document.getElementById("contrasenaTwu").value;
  var mensaje = document.getElementById("mensaje");

  if (nombre == "") {
    mensaje.style.display = 'block';
    mensaje.innerHTML = "El nombre esta vacio!";
    mensaje.classList.add('alert-danger');
    mensaje.classList.remove('alert-success');
    return false;

  }
  if (usuario == "") {
    mensaje.style.display = 'block';
    mensaje.innerHTML = "El usuario esta vacio!";
    mensaje.classList.add('alert-danger');
    mensaje.classList.remove('alert-success');
    return false;

  }
  if (telefono == "") {
    mensaje.style.display = 'block';
    mensaje.innerHTML = "El telefono esta vacio!";
    mensaje.classList.add('alert-danger');
    mensaje.classList.remove('alert-success');
    return false;

  }

  if (contrasena === contrasenatwu) {
    mensaje.style.display = 'block';
    mensaje.innerHTML = "Las Contraseñas coinciden !";
    mensaje.classList.add('alert-success');
    mensaje.classList.remove('alert-danger');
    return true;
  } else {
    mensaje.style.display = 'block';
    mensaje.innerHTML = "Las Contraseñas no coinciden, vuelve a intentar !";
    mensaje.classList.add('alert-danger');
    mensaje.classList.remove('alert-success');

    return false;
  }
}

function visitante() {
  var visitante = localStorage.getItem("visitante");
  if (visitante) {
    return "&visitante=" + visitante;
  } else return visitante = "";
}

function showPedidos() {
  window.location.href = "/peliculas?listado=lis" + visitante();
}
//console.log("visitaaaaaa: "+visitante());
function iniciarInvitado() {
  // console.log("visitaaaaaa: "+);

  localStorage.clear();
  var visitante = document.getElementById("txtVisitante").value;
  if (visitante && visitante.trim().length > 0) {
    localStorage.setItem("visitante", visitante);
    window.location.href = "/peliculas";
  } else {
    alert("Ingrese su nombre para idenfitifarlo");
  }

}



function select(id_pelicul, nuevo) {
  // console.log(document.getElementById(id_pelicul).style.border);
  //la variable nuevo es para saber si se esta llamando cuando el cliente pulsa la peliucla
  //o cuando se caraga la pagina: true=cliente, false=pagina
  try {//evitar el error de no econtrar el elemento   
    var image = document.getElementById(id_pelicul).style.border;
    if (image == '7px solid rgb(0, 148, 247)') {
      document.getElementById(id_pelicul).style.border = "rgb(17, 148, 28) 3px solid";
      agregar(-1);
      savePeliSelec(id_pelicul, false);
      quitarMemoriar(id_pelicul);
    }
    else {
      agregar(1);
      agegarMemoria(id_pelicul);
      document.getElementById(id_pelicul).style.border = "rgb(0, 148, 247) 7px solid";
      if (nuevo) savePeliSelec(id_pelicul, true);
    }
  } catch (error) {
   // si no ecuentra el elemento agrega en la menor y cuneta
   //pero no trataea de cambiar el stilo del la pelicula ya que no se encuetra en el DOOM
    agregar(1);
    agegarMemoria(id_pelicul);
  }


}

function savePeliSelec(id, save) {/// guarda en la base de datos

  var accion;
  if (save) accion = "/peliculas/save?save=";
  else accion = "/peliculas/save?delete=";
  var datos;
  console.log("save: ");
  console.log(this.fetch(accion + id + visitante()));


}

function BorrarTodo() {
  var accion;
  accion = "/peliculas/delete?delete=All" + visitante();
  this.fetch(accion);

  elimiarSlect();
  ocultarSiNo();
}

function agegarMemoria(id) {
  var peli = localStorage.getItem("peliSelecionados");
  if (peli == null) peli = id;
  else peli = peli + " " + id
  //console.log(peli);
  localStorage.setItem("peliSelecionados", peli);
}

function quitarMemoriar(id) {
  var peli = localStorage.getItem("peliSelecionados").replace(id, "");
  localStorage.setItem("peliSelecionados", peli.trim());
}



var cant = 0;
function agregar(num) {
  cant = cant + num;
  if (cant == 0) document.getElementById("cantidad").textContent = '';
  else
    document.getElementById("cantidad").textContent = cant;

}

function elimiarSlect() {
  var memoria = localStorage.getItem("peliSelecionados");

  if (memoria) {
    var pelis_Select = localStorage.getItem("peliSelecionados").split(" ");
    //console.log(pelis_Select);
    for (let i in pelis_Select) {

      if (document.getElementById("" + pelis_Select[i]))
        document.getElementById("" + pelis_Select[i]).style.border = "rgb(17, 148, 28) 3px solid";

    }
    document.getElementById("cantidad").textContent = '';
    localStorage.removeItem("peliSelecionados")// elimiar en la memori todos lo seleccionado
    cant = 0;
    //localStorage.clear();//eliminar todo la memoria

  }
}

function decargarQR(imagen, nombre) {
  nombre = 'QR ' + nombre + '.jpg'
  fetch(imagen)
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = nombre;
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => alert('Intente de nuevo, hubo un error en la descaraga'));
}

window.addEventListener("load", function () {
  var objects = document.getElementsByClassName("id_carrito");  //verificar si hay en el DOOM los elementos con lo ids de peliculas
  cant = 0;//reniciar el contador de peliculas
  localStorage.removeItem("peliSelecionados");
  for (var obj of objects) {   // console.log(cant);    
    select(obj.id.substring(1, obj.id.length), false);
  }


  if (window.location.href.indexOf("peliculas") >= 0) {
    //  document.getElementById("genero").style.display = "block";
 
    var memoria = localStorage.getItem("peliSelecionados");
    if (memoria) {
      
      var pelis_Select = memoria.split(" ");
      for (let i in pelis_Select) {
        
        if (document.getElementById("" + pelis_Select[i])) {
          document.getElementById("" + pelis_Select[i]).style.border = "rgb(0, 148, 247) 7px solid";          //console.log( document.getElementById("" + pelis_Select[i]).style);       
        }

      }

    }




  }
  if (window.location.href.indexOf("iniciar") >= 0) {
    var contrasenatwu = document.getElementById("contrasenaTwu");
    var contrasena = document.getElementById("contrasena");
    var mensaje = document.getElementById("mensaje");

    contrasenatwu.addEventListener('keypress', () => {
      var timeout;
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        compararContrasena();
        clearTimeout(timeout)
      }, 1000)
    });

    contrasena.addEventListener('keypress', () => {
      var timeout;
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (mensaje.style.display == "block")
          compararContrasena();
        clearTimeout(timeout)
      }, 1000)
    });

    var tab3 = document.getElementById("tab-1");
    tab3.checked = true
    console.log(tab3);


  }
});




















