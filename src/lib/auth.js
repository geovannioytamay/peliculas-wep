//para sber si un usuario esta logiado

module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {  
           // console.log("entrar_______________________________________________________________________________");         
            return next();
        }
       // console.log("pasa aqui 1_>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><");
        return res.redirect('/iniciar');
    },  isNotLoggedIn (req, res, next) {
        if (!req.isAuthenticated()) {  
          //  console.log("salir_______________________________________________________________________________");          
            return next();
        }
        //console.log("pasa aqui 2_>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><");
        return res.redirect('/peliculas');
    }
};