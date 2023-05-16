const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/registrar', isNotLoggedIn, (req, res) => {
  const login="false";// para ocucltar el  <aside> o herraminetas
  res.render('auth/iniciar', {login});
});

router.post('/registrar', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/peliculas',
  failureRedirect: '/iniciar',
  failureFlash: true
  
}));

// SINGIN
router.get('/iniciar', isNotLoggedIn, (req, res) => {
  const login="false";// para ocucltar el  <aside> o herraminetas
  res.render('auth/iniciar', {login});// enviamos login en el front-end
});

router.get('/iniciar2', (req, res) => {    // cuando se registre por rede sociales
  res.render('auth/iniciar');
});

router.post('/iniciar', isNotLoggedIn, (req, res, next) => {
  req.check('usuario', 'Usuario es requerido').notEmpty();
  req.check('contrasena', 'Contraseña es requerido').notEmpty();  
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/iniciar');
  }  
  passport.authenticate('local.signin', {
    successRedirect: '/peliculas',
    failureRedirect: '/iniciar',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout',  (req, res) => {  
  req.logOut(); 
  res.redirect('/iniciar');
});

router.get('/perfil', isLoggedIn, (req, res) => {
  res.render('perfil');
});


router.get('/edit_usuario', isLoggedIn, async (req, res) => {
  const id_usuario  = req.user.id_usuario;    
  //console.log(links);
  res.render('edit_usuario', { id_usuario });
});
router.get('/edit_telefono', isLoggedIn, async (req, res) => {
const id_usuario  = req.user.id_usuario;    
//console.log(links);
res.render('edit_telefono', { id_usuario });
});
router.get('/edit_nombre', isLoggedIn, async (req, res) => {
  const id_usuario  = req.user.id_usuario;    
  //console.log(links);
  res.render('edit_nombre', { id_usuario });
  });
router.get('/edit_contrasena', isLoggedIn, async (req, res) => {
  const id_usuario  = req.user.id_usuario;    
  //console.log(links);
  res.render('edit_contrasena', { id_usuario });
});

///iniciar con rede sosiales
router.get('/auth/twitter', isNotLoggedIn, passport.authenticate('twitter'));
router.get('/auth/facebook',isNotLoggedIn, passport.authenticate('facebook'));
router.get('/auth/google',isNotLoggedIn, passport.authenticate('google',{
  scope: 'profile'}));
router.get('/auth/instagram',isNotLoggedIn, passport.authenticate('instagram'));

//callbacks
router.get('/auth/twitter/callback', isNotLoggedIn,passport.authenticate('twitter',
  { successRedirect: '/peliculas', failureRedirect: '/inicio' }
));
router.get('/auth/facebook/callback', isNotLoggedIn,passport.authenticate('facebook',
  { successRedirect: '/peliculas', failureRedirect: '/inicio' }
));
router.get('/auth/google/callback', isNotLoggedIn, passport.authenticate('google',
  { successRedirect: '/peliculas', failureRedirect: '/inicio' }
));
router.get('/auth/instagram/callback',isNotLoggedIn, passport.authenticate('instagram',
  { successRedirect: '/peliculas', failureRedirect: '/inicio' }
));
module.exports = router;
