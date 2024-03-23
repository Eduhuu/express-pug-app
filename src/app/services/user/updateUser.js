const userModel = require("../../models/user")

const updateUser = async (req, res) => {
    const { name, lastname, email } = req.body
    const user_id = req.cookies.user_id

    const current_user = await userModel.getUserInfo(user_id)

    if (!name || !lastname || !email) {
        res.render("page/profile", { ...current_user, can_edit: true, alert_message: "Todos los campos son obligatorios." })
        res.status(400)
        return res
    }

    if (await userModel.isUserExist(req.body) && current_user.email !== email) {
        res.render("page/profile", { ...current_user, can_edit: true, alert_message: "Correo ya existente." })
        res.status(400)
        return res
    }

    const update_img = req.img_register ?? current_user.img


    await updateUser(name, lastname, email, user_id, update_img)

    return res.status(200).render("page/profile", { name, lastname, email, img: update_img, alert_message: "Se actualizo el perfil exitosamente.", can_edit: true, })


}

module.exports = {
    updateUser
}