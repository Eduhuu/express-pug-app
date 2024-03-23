const publicationModel = require("../../models/publication")


const showPublication = async (req, res) => {
    const publication_id = req.params.id
    const user_id = req.cookies.user_id
    const publication = await publicationModel.getPublication(publication_id)
    return res.status(200).render("page/detail-publication", { publication: publication, publication_id, user_id, is_admin: req.cookies.user_rol })
}

module.exports = {
    showPublication
}