const passport = require('passport');
const Usuarios = require('../models/Usuarios');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Campos vacios, verifica tu información'
});

exports.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/iniciar-sesion');
    }
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    });
}

exports.enviarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: { email: req.body.email }
    });

    if (!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.render('reestablecer', {
            nombrePagina: 'Reestablecer contraseña',
            error: req.flash()
        });
    }
}