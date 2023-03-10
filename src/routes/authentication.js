const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/registrar', isNotLoggedIn, (req, res) => {
  const gen="false";
  res.render('auth/iniciar', {gen});
});

router.post('/registrar', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/peliculas',
  failureRedirect: '/iniciar',
  failureFlash: true
}));


// SINGIN
router.get('/iniciar', isNotLoggedIn, (req, res) => {
  const gen="false";
 res.render('auth/iniciar', {gen});
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



router.get('/logout', isLoggedIn, (req, res) => {
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
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/google', passport.authenticate('google'));
router.get('/auth/instagram', passport.authenticate('instagram'));

//callbacks
router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/peliculas', failureRedirect: '/inicio' }
));
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/peliculas', failureRedirect: '/inicio' }
));
router.get('/auth/google/callback', passport.authenticate('google',
  { successRedirect: '/peliculas', failureRedirect: '/inicio' }
));
router.get('/auth/instagram/callback', passport.authenticate('instagram',
  { successRedirect: '/peliculas', failureRedirect: '/inicio' }
));
module.exports = router;
