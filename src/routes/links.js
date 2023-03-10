const express = require('express');
const router = express.Router();
//pool = db
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

const helpers = require('../lib/helpers');

var http = require("http");
var url = require("url");

router.get('/add', isLoggedIn, () => {
    console.log('Accessing the secret section ...');

});

router.get('/save', async (req, res) => {
    var query = url.parse(req.url, true).query;
    var id_pelicula;
    var id_usuario;
    try {
        var id_usuario = req.user.id_usuario;
    } catch (err) {
        id_usuario = query.visitante;
    }

    try {
        if (query.save) {
            id_pelicula = query.save;
            const pedido = {
                id_pelicula,
                id_usuario
            };
            await pool.query('INSERT INTO pedidos set ?', [pedido]);
        } else {
            id_pelicula = query.delete;
            //console.log("Eliminar peli:"+id_pelicula+" usuario: "+id_usuario);
            await pool.query('DELETE from pedidos WHERE id_pelicula= ? AND id_usuario=?', [id_pelicula, id_usuario]);
        }
    } catch (err) {
        console.log("______ERROR________");
        console.log(err.sqlMessage);
        console.log(err.sql);
    }


});

router.get('/pedidos', async (req, res) => {
    var id_usuario = req.user.id_usuario;

    var pelis = await pool.query('SELECT id_pelicula FROM pedidos WHERE id_usuario =?', id_usuario);
    console.log("________________________________" + id_usuario);

    return new Promise((resolve, reject) => {
        var pedidos = JSON.stringify(pelis);
        console.log(pedidos);
        if (typeof pedidos != 'string') return reject('error');
        return resolve(pedidos);
    });
});


router.get('/delete', async (req, res) => {
    try {
        var id_usuario = req.user.id_usuario;

    } catch (err) {
        id_usuario = query.visitante;
    }

    try {
        var id_usuario = req.user.id_usuario;

    } catch (err) {
        id_usuario = query.visitante;
    }


    try {
        await pool.query('DELETE from pedidos WHERE id_usuario="?" ', id_usuario);

    } catch (err) {
        console.log("______ERROR________");
        console.log(err.sqlMessage);
        console.log(err.sql);
    }

});



router.get('/', async (req, res) => {
    //   const pelis = await pool.query('SELECT * FROM (pelicula inner join usuario_pelicula) WHERE pelicula.id_pelicula = usuario_pelicula.id_pelicula and  id_usuario = ?',
    //  [req.user.id_usuario]);


    var query = url.parse(req.url, true).query;
    var buscar = query.buscar;
    var gen = query.genero;
    var lis = query.listado;
    var proximo = query.proximo;



    var pelis = null;

    const genero = await pool.query('SELECT genero FROM genero');


    // console.log("busca "+gen );
    if (proximo) {
        pelis = await pool.query('SELECT * from pelicula where descargado=0 order by anio desc, id_pelicula desc');

    } else
        if (lis) {
            var id_usuario;
            try {
                id_usuario = req.user.id_usuario;
            } catch (err) {
                id_usuario = query.visitante;
            }
            pelis = await pool.query('SELECT* FROM (pelicula INNER JOIN pedidos)'
                + ' WHERE pelicula.id_pelicula = pedidos.id_pelicula AND id_usuario= ?', id_usuario);
        } else
            if (gen) {
                pelis = await pool.query('SELECT* FROM (pelicula INNER JOIN pelicula_genero ) WHERE pelicula.id_pelicula = pelicula_genero.id_pelicula AND descargado=1 and pelicula_genero.genero= ? ORDER BY pelicula.anio DESC, pelicula.id_pelicula desc', gen);
            } else
                if (buscar) {
                    buscar = '%' + buscar + '%';
                    pelis = await pool.query('SELECT * from pelicula where nombre like ? and descargado=1 order by anio desc, id_pelicula desc', buscar);
                } else {
                    pelis = await pool.query('SELECT * from pelicula where descargado=1 order by anio desc, id_pelicula desc');

                }


    res.render('peliculas/list', { pelis, genero });
    //o puedo pasarlo con otro nombre
    //por jemploe links: datos
});



router.get('/genero', isLoggedIn, async (req, res) => {
    const pelis = await pool.query('SELECT * FROM (pelicula inner join usuario_pelicula) WHERE pelicula.id_pelicula = usuario_pelicula.id_pelicula and  id_usuario = ?',
        [req.user.id_usuario]);
    res.render('peliculas/list', { pelis });
    //o puedo pasarlo con otro nombre
    //por jemploe links: datos
});



router.post('/:genero', isLoggedIn, async (req, res) => {
    const { genero } = req.params;
    console.log("genero" + genero);
    //const info = await pool.query('select nombre, imagen, sinopsis, trailer FROM pelicula  WHERE id_pelicula = ?', [id]);
    var pelis = await pool.query('SELECT * from pelicula where descargado=0 order by anio desc, id_pelicula desc');
    res.render('peliculas/list', { pelis });
});



router.post('/edit_nombre/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const {nombre} = req.body;
    const sql= 'UPDATE usuario set nombre= "'+nombre+'" WHERE id_usuario = '+id;
    //console.log(sql+"___________________________________________________________________________")
    await pool.query(sql);    
    req.flash('Exito!!', 'Nombre actualizado correctamente');
    res.redirect('/perfil');
});
router.post('/edit_usaurio/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const {usuario} = req.body;
    const sql= 'UPDATE usuario set usuario= "'+usuario+'" WHERE id_usuario = '+id;
    //console.log(sql+"___________________________________________________________________________")
    await pool.query(sql);    
    req.flash('Exito!!', 'Usaurio actualizado correctamente');
    res.redirect('/perfil');
});

router.post('/edit_contrasena/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const {oldcontrase??a} = req.body;
    const {newcontrase??a} = req.body;
    const {repircontrase??a} = req.body;

    const rows = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', id);
    const user = rows[0];

    const validPassword = await helpers.matchPassword(oldcontrase??a, user.contrase??a)

    if(validPassword){     
        //console.log("_________________________validado __________________________________________________")
        if(newcontrase??a==repircontrase??a){
            const contra_encly= await helpers.encryptPassword(newcontrase??a);
            const sql= 'UPDATE usuario set contrasena= "'+contra_encly+'" WHERE id_usuario = '+id;
            ///console.log("_________________________exito __________________________________________________")
            await pool.query(sql);    
            req.flash('Exito!!', 'Contrase??a actualizado correctamente');
            res.redirect('/perfil');
        }else{
            req.flash('Datos incorrectos', 'Las contrase??as nuevas no coinsiden');
            res.redirect('/peliculas/edit_contrasena');
           // console.log("_________________________no son iguales __________________________________________________")
        }
    }else{
        req.flash('Datos incorrectos', 'Contrase??a anterior incorrecto');
        res.redirect('/peliculas/edit_contrasena');
        //console.log("_________________________contra incorecto __________________________________________________")
    }

   
});



module.exports = router;