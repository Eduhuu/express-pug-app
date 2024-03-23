const { createPublication } = require("../services/publication/createPublicationService")
const { editPublication } = require("../services/publication/editPublicationService")
const { listPublications } = require("../services/publication/listPublications")
const { showPublication } = require("../services/publication/showPublication")
const { deletePublication } = require("../services/publication/deletePublication")
const { blockPublication } = require("../services/publication/blockPublication")

module.exports = {
    createPublication,
    editPublication,
    listPublications,
    showPublication,
    deletePublication,
    blockPublication
}
