const { createComment } = require("../services/comment/createCommentService")
const { deleteComment } = require("../services/comment/deleteCommentService")
module.exports = {
    createComment,
    deleteComment,
}