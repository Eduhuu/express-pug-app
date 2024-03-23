const publicationModel = require("../../models/publication")

const editPublication = async (req, res) => {
    const publication_id = req.params.id
    const user_id = req.cookies.user_id
    const form_action = `/edit-publication/${publication_id}`
    const publication = await publicationModel.getPublication(publication_id)
    const file = req.img_register
    const { title, content } = req.body

    if ((!content || !title) || (!publication.image && !file)) {
        return res.status(400).render("page/edit-publication", {
            publication: publication,
            publication_id,
            user_id,
            form_action,
            alert_message: "Todos los campos son obligatorios."
        })
    }

    const newFile = file ? file : publication.image

    await publicationModel.editPublication(title, content, newFile, publication_id)

    return res.status(200).render("page/edit-publication", {
        publication: {
            title: title,
            content: content,
            image: newFile
        },
        publication_id,
        user_id,
        form_action,
        alert_message: "Se actualizo exitosamente."
    })
}
module.exports = {
    editPublication
}