const publicationModel = require("../../models/publication")

const PAGE_SIZE = 10

const listPublications = async (req, res) => {
    const current_page = parseInt(req.query.page ?? "1")
    const publications = await publicationModel.getPublications(PAGE_SIZE, current_page)
    const count = await publicationModel.getCountPublication()

    const max_page = count % PAGE_SIZE === 0 ? Math.trunc(count / PAGE_SIZE) : Math.trunc(count / PAGE_SIZE) + 1
    const pages = []
    for (let i = current_page - 2; i <= current_page + 2; i++) {
        if (i <= 0) continue
        if (i > max_page) break
        pages.push(i)
    }

    const prev = current_page - 1 > 1 ? current_page - 1 : 1
    const next = current_page + 1 <= max_page ? max_page : current_page + 1

    res.status(200).render("page/index", { publications, pages, prev, next, is_admin: req.cookies.user_rol == "admin" })
}

module.exports = {
    listPublications
}