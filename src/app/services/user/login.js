const jwt = require("jsonwebtoken")
const userModel = require("../../models/user")
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    // Validacion de la peticion.
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        res.render('page/login', { alert_message: 'Todos los campos son obligatorios.' });
        return res
    }
    // Buscar usuario por correo electronico.
    const user = await userModel.getUserByEmail(email)
    // Si no existe el usuario se envia un mensaje de error.
    if (!user) {
        res.status(400)
        res.render('page/login', { alert_message: 'Credenciales incorrectas.' });
        return res
    }
    // Si el usuario esta bloqueado, se envia mensaje de error.
    if(user.blocked){
        res.status(401)
        res.render('page/login', { alert_message: 'Su usuario esta bloqueado.' });
        return res
    }
    //  Se valida la contrasena.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // Si no es valida se envia mensaje de error.
    if (!isPasswordValid) {
        res.status(400)
        res.render('page/login', { alert_message: 'Credenciales incorrectas.' });
        return res
    }

    // Iniciar sesión correctamente    
    //  Se crea el token de autenticacion.
    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET);
    // Se crean las cookies necesarias.
    //  Cookie con token.
    res.cookie('token', token, { httpOnly: true });
    //  Cookie con id del usuario.
    res.cookie('user_id', user.id, { httpOnly: true });
    //  Cookie con rol de usuario.
    res.cookie('user_rol', user.rol, { httpOnly: true });
    res.status(200)
    res.redirect('/')
    return res
}

module.exports = {
    login
}