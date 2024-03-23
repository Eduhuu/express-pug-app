const bcrypt = require('bcrypt');
const userModel = require("../../models/user")

const confirmPassword = async (req, res) => {
    const { password, confirm_password } = req.body

    if (!password || !confirm_password) return res.status(400).render('page/confirm-password', { alert_message: 'Todos los campos son obligatorios.' });
    if (password !== confirm_password) return res.status(400).render('page/confirm-password', { alert_message: 'Las contraseñas deben de ser iguales.' });
    const valid_email = req.cookies.valid_email;
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.changeUserPassword(hashedPassword, valid_email)

    res.status(200)
    res.render("page/login", { alert_message: 'Se actualizo la contraseña de su usuario exitosamente.' })
    return res
}

module.exports = {
    confirmPassword
}