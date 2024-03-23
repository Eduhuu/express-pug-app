const userModel = require("../../models/user")


const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await userModel.deleteUser(id)
    } catch {
        return res.send(500)
    }
    return res.send(200)
}

module.exports = {
    deleteUser
}