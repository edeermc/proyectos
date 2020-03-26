const Usuarios = require('../models/Usuarios');

exports.creaCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en UpTask'
    });
}

exports.nuevaCuenta = async (req, res) => {
    const { email, password } = req.body;

    try {
        await Usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion');
    } catch(error) {
        req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta', {
            nombrePagina: 'Crear cuenta en UpTask',
            mensajes: req.flash(),
            email,
            password
        });
    }
}

exports.iniciaSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciaSesion', {
        nombrePagina: 'Inicia sesión en UpTask',
        error
    });
}

exports.reestableceContrasena = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer contraseña'
    });
}