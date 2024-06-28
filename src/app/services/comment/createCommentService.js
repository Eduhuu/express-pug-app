const publicationModel = require("../../models/publication")
const commentnModel = require("../../models/comment")

const createComment = async (req, res) => {
    const { comment } = req.body
    const publication_id = req.params.id
    const publication = await publicationModel.getPublication(publication_id)
    if (!publication) return res.status(404).render("/")
    const user_id = req.cookies.user_id
    if (!comment) {
        return res.status(400).render("page/detail-publication", { publication: publication, publication_id, alert_message: "Todos los campos son obligatorios." })
    }
    await commentnModel.createComment(comment, user_id, publication_id)
    return res.status(200).redirect(`/publication/${publication_id}`)
}

module.exports = {
    createComment
}