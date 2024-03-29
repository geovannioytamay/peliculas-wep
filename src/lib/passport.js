const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'contrasena',
  passReqToCallback: true
}, async (req, usuario, contrasena, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(contrasena, user.contrasena)
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.usuario));
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'Este usuario no existe.'));
  }
}));

passport.use('local.visit', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'contrasena',
  passReqToCallback: true
}, async (req, usuario, contrasena, done) => {
  var us = 0;

  do {
    var visitante = "visitante" + us;
    const rows = await pool.query('SELECT* FROM pedidos WHERE id_usuario = ?', [visitante]);
    done(null, visitante, req.flash('success', 'Bienvenido ' + visitante));
    us++;

  } while (rows.length > 0);
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'contrasena',
  passReqToCallback: true
}, async (req, usuario, contrasena, done) => {

  const { nombre, telefono, codigo } = req.body;
  const pts = 0;
  const fecha_creacion = getFecha();
  const loginpor = "Local"
  const activado = "No"
  if (codigo.length > 0) {
    id_usuario = codigo;
    const usarioAmigo = await pool.query("SELECT * from usuario where id_usuario='" + id_usuario + "'"); //para ver si exise el codigo
    console.log(usarioAmigo[0]);

    if (usarioAmigo.length == 0) {
      return done(null, false, req.flash('message', 'Codigo de invitación es incorrecto, solicitalo de nuevo.'));
    }
  }

  let newUser = {
    nombre,
    usuario,
    contrasena,
    telefono,
    fecha_creacion,
    loginpor,
    pts
  };
  let invitacion = {// para gusardar infomacion de relacion de la invitacion
    id_usuario, // id del amigo que proporsiono su codigo
    activado// 0 porque el usuario aun no ha comprado peliculas
  };
  newUser.contrasena = await helpers.encryptPassword(contrasena);
  // Saving in the Database

  const result = await pool.query('INSERT INTO usuario SET ? ', newUser);
  invitacion.id_amigo = result.insertId;// id del amigo quien se registro con el codigo de su amigo

  if (codigo.length > 0) 
  await pool.query('INSERT INTO invitacionnewusuario SET ? ', invitacion);
  newUser.id_usuario = result.insertId;
  return done(null, newUser);
}));



function getFecha() {
  var today = new Date();
  var dia = (today.getDate());
  var mes = (today.getMonth() + 1);
  var anio = (today.getFullYear());
  return dia + "/" + mes + "/" + anio;
}

passport.serializeUser((user, done) => {
  done(null, user.id_usuario);
});

passport.deserializeUser(async (id_usuario, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario]);
  done(null, rows[0]);
});

