const bcrypt = require('bcrypt');
const userModel = require("../../models/user")

const register = async (req, res) => {
    const file = req.img_register
    const { name, lastname, email, password, confirm_password } = req.body
    if (!name || !lastname || !email || !password || !confirm_password || !file) {
        res.status(400)
        res.render("page/register", { alert_message: "Todos los campos son obligatorios" })
        return res
    }
    const user_exist = await userModel.isUserExist(req.body)
    if (user_exist) {
        res.status(400)
        res.render("page/register", { alert_message: "Ya existe un usuario con ese correo. Por favor utilice otro" })
        return res
    }
    if (password !== confirm_password) {
        res.status(400)
        res.render("page/register", { alert_message: "Las contrasenas deben de coincidir." })
        return res
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser(name, lastname, email, hashedPassword, file)

    res.status(200)
    res.redirect('/login');
    return res
}

module.exports = {
    register
}