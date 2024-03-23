const jwt = require("jsonwebtoken")
const userModel = require("../../models/user")
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        res.render('page/login', { alert_message: 'Todos los campos son obligatorios.' });
        return res
    }

    const user = await userModel.getUserByEmail(email)

    if (!user) {
        res.status(400)
        res.render('page/login', { alert_message: 'Credenciales incorrectas.' });
        return res
    }

    if(user.blocked){
        res.status(401)
        res.render('page/login', { alert_message: 'Su usuario esta bloqueado.' });
        return res
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400)
        res.render('page/login', { alert_message: 'Credenciales incorrectas.' });
        return res
    }

    // Iniciar sesión correctamente    
    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.cookie('user_id', user.id, { httpOnly: true });
    res.cookie('user_rol', user.rol, { httpOnly: true });
    res.status(200)
    res.redirect('/')
    return res
}

module.exports = {
    login
}