const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
const { Console } = require('console');
const pool = require('./database');

// Estrategia de autenticación con sosial
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
var config = require('./config');

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.
module.exports = function (passport) {

	// Serializa al usuario para almacenarlo en la sesión
	passport.serializeUser(function (user, done) {		
		done(null, user);
	});

	// Deserializa el objeto usuario almacenado en la sesión para
	// poder utilizarlo
	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	// Configuración del autenticado con Twitter
	passport.use(new TwitterStrategy({
		consumerKey:  process.env.KEY_TWITTER || config.twitter.key,
		consumerSecret:  process.env.SECRET_TWITTER || config.twitter.secret,
		callbackURL: '/auth/twitter/callback'
	}, function (accessToken, refreshToken, profile, done) {		
		sesion(profile.id,profile.displayName, profile.photos[0].value,profile.provider);		  		  
		  return done(null, profile.id);			
	}));
	// Configuración del autenticado con Facebook
	passport.use(new FacebookStrategy({
		clientID: process.env.KEY_FACEBOOK || config.facebook.key,
		clientSecret:  process.env.SECRET_FACEBOOK || config.facebook.secret,
		callbackURL:'/auth/facebook/callback',
		profileFields: ['id', 'displayName', /*'provider',*/ 'photos']
	}, function (accessToken, refreshToken, profile, done) {

		//profile.email[0] // para checar despues
		  sesion(profile.id,profile.displayName, profile.photos[0].value,profile.provider);		  		  
		  return done(null, profile.id);			
	}));
	// Configuración del autenticado con google
	passport.use(new GoogleStrategy({
		clientID:  process.env.KEY_GOOGLE || config.google.key,
		clientSecret:  process.env.SECRET_GOOGLE || config.google.secret,
		callbackURL: '/auth/google/callback',
		//profileFields: ['id', 'displayName', /*'provider',*/ 'photos']
	}, function (accessToken, refreshToken, profile, done) {
		// profile.emails[0].value, para optnener su correo
		  sesion(profile.id,profile.displayName, profile.photos[0].value,profile.provider);		  		  
		  return done(null, profile.id);			
	}));

	// Configuración del autenticado con Facebook
	passport.use(new InstagramStrategy({
		clientID:  process.env.KEY_INSTAGRAM || config.instagram.key,
		clientSecret:  process.env.SECRET_INSTAGRAM || config.instagram.secret,
		callbackURL: '/auth/instagram/callback',
		profileFields: ['id', 'displayName', /*'provider',*/ 'photos']
	}, function (accessToken, refreshToken, profile, done) {
		  sesion(profile.id,profile.displayName, profile.photos[0].value,profile.provider);		  		  
		  return done(null, profile.id);			
	}));

	function sesion(id, usuario, foto, sosial){
		

		pool.query("SELECT * from usuario where id_usuario='"+id+"'", (err,rows) => {
			if(err) throw err;
			if(rows && rows.length === 0) {// no existe
				//console.log("There is no such user, adding now");//agragar usuario nuevo
				pool.query("INSERT into usuario(id_usuario,nombre, usuario,foto, loginpor,fecha_creacion, pts ) VALUES('"
					+id+
				"','"+usuario+
				"','"+usuario+
				"','"+foto+
				"','"+sosial+
				"','"+getFecha()+
				"',0"+
				")");
			} else {
			   // console.log("User already exists in database");
			}
		  });
	}

	function getFecha(){  
		var today = new Date();
		var dia=(today.getDate());
		var mes=(today.getMonth()+1);
		var anio=(today.getFullYear()); 
		return dia+"/"+mes+"/"+anio;  
	  }

};
