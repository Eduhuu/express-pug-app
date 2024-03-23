const commentModel = require("../../models/comment")

const deleteComment = async (req, res) => {
    const comment_id = req.params.id
    await commentModel.deleteComment(comment_id)
    return res.send(200)
}

module.exports = {
    deleteComment
}