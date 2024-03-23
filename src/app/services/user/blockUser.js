const userModel = require("../../models/user")

const blockUser = async (req, res) => {
    const id = req.params.id
    try {
        await userModel.blockUser(id)
    } catch {
        return res.send(500)
    }
    return res.send(200)
}

module.exports = {
    blockUser
}