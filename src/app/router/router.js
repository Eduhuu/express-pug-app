// MIDDLEWARES
const auth = require("../middleware/auth")
const adminView = require("../middleware/adminView")
const { upload } = require("../middleware/multer")

// EXPRES ROUTES
const router = require("express").Router()


// CONTROLLER
const userController = require("../controllers/auth")
const publicationController = require("../controllers/publication")
const commentsController = require("../controllers/comments")

// MODEL
const userModel = require("../models/user")
const publicationModel = require("../models/publication")
const commentModel = require("../models/comment")


// Register    
router.get("/register", (req, res) => {
    res.status(200).render("page/register")
})
router.post("/register", upload.single('avatar-input-register'), userController.register)

// LogIn
router.get("/login", (req, res) => {
    res.status(200).render("page/login")
})
router.post("/login", userController.login)

// Restore password
router.get("/restore-password", (req, res) => {
    res.status(200).render("page/restore-password")
})
router.post("/restore-password", userController.restorePassword)

// Create new password 
// AQUI
router.get("/confirm-password", (req, res) => {

    if (!req.query || !req.query.code) {
        return res.redirect("/restore-password")
    }

    const decode = userController.validConfirmPasswordToken(req.query.code)
    if (!decode || !decode.email) {
        return res.redirect("/restore-password")
    }
    res.cookie("valid_email", decode.email)
    res.status(200).render(`page/confirm-password`)
})

router.post("/confirm-password", userController.confirmPassword)

// Log Out
router.post("/logout", userController.logout)

// Index
// router.get("/", auth, publicationController.listPublications)
router.get("/", publicationController.listPublications)


//Publication
router.get("/publication",auth, async (req, res) => {
    res.render("page/publication")
})

router.get("/publication/:id", publicationController.showPublication)

router.post("/publication", auth, upload.single('publication-input'), publicationController.createPublication)

// AQUI
router.get("/edit-publication/:id/", async (req, res) => {
    const publication_id = req.params.id
    const user_id = req.cookies.user_id
    const user = await userModel.getUserInfo(user_id)
    const publication = await publicationModel.getPublication(publication_id)
    const form_action = `/edit-publication/${publication_id}`
    if (user_id != publication.autor_id || user.rol !== "admin") {
        res.redirect(`/publication/${publication_id}`)
    }
    res.render("page/edit-publication", { publication: publication, publication_id, user_id, form_action })
})

router.post("/edit-publication/:id/", upload.single('publication-input'), publicationController.editPublication)


router.delete("/publication/:id", publicationController.deletePublication)

// Comentarios
router.post("/comment/:id",auth, commentsController.createComment)
router.delete("/comment/:id",auth, commentsController.deleteComment)


// Profile
// AQUI
router.get("/profile", auth, async (req, res) => {
    let user_info = {}
    if (req.cookies.user_id) {
        user_info = await userModel.getUserInfo(req.cookies.user_id)
    }
    res.status(200).render("page/profile", { ...user_info, can_edit: true })
})
// AQUI
router.get("/profile/:id", auth, async (req, res) => {
    const user_info = await userModel.getUserInfo(req.params.id)
    const is_admin = req.cookies.user_rol
    res.render("page/profile", { ...user_info, can_edit: is_admin == "admin" })
})
router.post("/profile", auth, upload.single('profile-input-input'), userController.updateUser)

// Admin
// AQUI
router.get("/admin", auth, adminView, async (req, res) => {

    const user_count = await commentModel.getUserCount()
    const publication_count = await publicationModel.getPublicationCount()
    const commnets_count = await commentModel.getCommentsCount()
    const max_pub_user_count = await publicationModel.getMaxPublicationUser()
    const max_commnet_user_count = await commentModel.getMaxCommentUser()
    const users = await userModel.getUsers()
    const publications = await publicationModel.getStadisticsPublications()

    return res.render("page/admin", {
        user_count: user_count ?? "0",
        publication_count: publication_count ?? "0",
        commnets_count: commnets_count ?? "0",
        max_pub_user_count: max_pub_user_count ?? {
            name: "No existe",
            cant_publication: 0
        },
        max_commnet_user_count: max_commnet_user_count ?? {
            name: "No existe",
            cant_comments: 0
        },
        users: users ?? "0",
        publications: publications ?? "o"
    })
})

router.get("/confirm-password-profile", auth, (req, res) => {
    res.status(200).render("page/confirm-password-profile")
})

router.delete("/user/:id", auth, adminView, userController.deleteUser)

router.post("/user_block/:id/", auth, adminView, userController.blockUser)

router.post("/publication_block/:id/", auth, adminView, publicationController.blockPublication)

module.exports = router