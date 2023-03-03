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
function iniciar(){
  
  localStorage.clear();   
  document.getElementById("iniciar").action="/iniciar" 
  document.getElementById("iniciar").submit() ;
  
}

function visitante(){
  var visitante=localStorage.getItem("visitante");
  if(visitante){  
    return "&visitante="+visitante;
  }else return visitante="";
}

function showPedidos(){
 window.location.href="/peliculas?listado=lis"+visitante();  
}
//console.log("visitaaaaaa: "+visitante());
function iniciarInvitado(){
 // console.log("visitaaaaaa: "+);
  
  localStorage.clear();
  var visitante = document.getElementById("txtVisitante").value; 
  if(visitante && visitante.trim().length>0){
    localStorage.setItem("visitante", visitante);
    window.location.href="/peliculas";
  }else{
    alert("Ingres su nombre para indenfitifarlo");
  }
  
  
}



function select(id_pelicul) {
  // console.log(document.getElementById(id_pelicul).style.border);
  var image = document.getElementById(id_pelicul).style.border;

  if (image == '7px solid rgb(0, 148, 247)') {
    document.getElementById(id_pelicul).style.border = "rgb(17, 148, 28) 3px solid";
    agregar(-1);
    savePeliSelec(id_pelicul, false);
    quitarMemoriar(id_pelicul);
  }
  else {
    document.getElementById(id_pelicul).style.border = "rgb(0, 148, 247) 7px solid";
    agregar(1);
    savePeliSelec(id_pelicul, true);
    //console.log('listo');
    //window.location.href="/peliculas/save";
    //console.log(pelis_Select);
    agegarMemoria(id_pelicul);

  }

}

function savePeliSelec(id, save) {/// guarda en la base de datos
  
  var accion;
  if (save) accion = "/peliculas/save?save=";
  else accion = "/peliculas/save?delete=";
  var datos;
  console.log("save: ");
  console.log(this.fetch(accion+id+visitante()));


}

function BorrarTodo() {
  var accion;
  

  accion = "/peliculas/delete?delete=All"+visitante();

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
  // pelis_Select= (localStorage.getItem(peliSelecionados)).split(",");
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

window.addEventListener("load", function () {

  if (window.location.href.indexOf("peliculas") >= 0) {
  //  document.getElementById("genero").style.display = "block";



    var memoria = localStorage.getItem("peliSelecionados");
    if (memoria) {
      var pelis_Select = memoria.split(" ");

      //console.log(pelis_Select);
      for (let i in pelis_Select) {

        if (document.getElementById("" + pelis_Select[i]))
          document.getElementById("" + pelis_Select[i]).style.border = "rgb(0, 148, 247) 7px solid";
        if (pelis_Select[i] != "")
          agregar(1);

        /// localStorage.removeItem("peliSelecionados")// elimiar en la memori todos lo seleccionado
        //console.log("peli: "+pelis_Select[i])
      }
    
    }

  } else {
   // document.getElementById("genero").style.display = "none";
  }





});




















