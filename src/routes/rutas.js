const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
//pool = db
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const helpers = require('../lib/helpers');

var http = require("http");
var url = require("url");


router.get('/historial', isLoggedIn, async (req, res) => {

    var id_usuario = req.user.id_usuario;
    //const fechasVenta = await pool.query('select distinct fecha from venta_pelicula where id_venta in ( select distinct id_venta from venta_pelicula where id_usuario =?)', id_usuario);
    var venta = await pool.query(' select venta_fecha.id_venta, pts, venta_fecha.fecha, venta_usuario.precio from (venta_usuario inner join venta_fecha) where id_usuario =? ORDER BY id_venta DESC', id_usuario);
    var amigos = await pool.query('select nombre, fecha_creacion, activado from (usuario inner join invitacionnewusuario) where usuario.id_usuario= id_amigo and invitacionnewusuario.id_usuario=? ORDER BY id_invitacion DESC', id_usuario);
        //fechasVenta=await encontrarCantidad(fechasVenta);
     await encontrarCantidad(venta);
    //console.log( pel[0].pelis );
    res.render('historial', { venta, amigos });

});


async  function encontrarCantidad (peliculas) {// encontrar la cantida de pelicula que compro ID
    var idVenta;
    var i=0;
   for  (const venta of peliculas) {
   
        idVenta = venta.id_venta
        const cant = await pool.query('SELECT COUNT(id_venta) AS cantidad from venta_pelicula where id_venta=?', idVenta);
        const pelis = await pool.query('select id_pelicula, nombre, anio, pts from pelicula where id_pelicula in (select id_pelicula from venta_pelicula where id_venta=?)', idVenta);

        venta.cantidad =  cant[0].cantidad;// agragaer el dato al JSON
        venta.pelis =  pelis;
          // console.log(fechasVenta[i++]);       
    }
    

    return  peliculas;


}

router.get('/politica_privacidad',  async (req, res) => {

    
    res.render('politica_privacidad');

});

module.exports = router;