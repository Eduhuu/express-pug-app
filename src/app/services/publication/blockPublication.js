const publicationModel = require("../../models/publication")

const blockPublication = async (req,res) => {

    const id = req.params.id
    try {
        await publicationModel.blockPublication(id)
    } catch {
        return res.send(500)
    }
    return res.send(200)

}

module.exports = {
    blockPublication
}