const publicationModel = require("../../models/publication")

const createPublication = async (req, res) => {
    const { content, title } = req.body
    const file = req.img_register
    const user_id = req.cookies.user_id
    if (!content || !file || !title) {
        return res.status(400).render("page/publication", { alert_message: "Todos los campos son obligatorios." })
    }

    await publicationModel.createPublication(file, content, user_id, title)

    return res.status(200).render("page/publication", { alert_message: "Se creo la publicacion exitosamente." })
}
module.exports = {
    createPublication
}