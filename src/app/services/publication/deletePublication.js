const publicationModel = require("../../models/publication")

const deletePublication = async (req, res) => {
    const publication_id = req.params.id
    try {

        await publicationModel.deletePublication(publication_id)
    } catch {
        res.send(500)
    }
    return res.send(200)
}
module.exports = {
    deletePublication
}