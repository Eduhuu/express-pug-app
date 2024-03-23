const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Customize storage location as needed
        let path  = ""
        // console.log("destination",file)
        if (file.fieldname === "avatar-input-register") {
            // console.log("register")
            path = "./src/public/uploads/avatars"
        }
        if (file.fieldname === "publication-input") {
            // console.log("publication")
            path = './src/public/uploads/publications'
        }
        if (file.fieldname === "profile-input-input") {
            console.log("profile")
            path = "./src/public/uploads/avatars"
        }
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const date = Date.now()
        if (file.fieldname === "avatar-input-register") {
            // console.log("register")
            req.img_register = `uploads/avatars/${date}${path.extname(file.originalname)}`
        }
        if (file.fieldname === "publication-input") {
            // console.log("publication")
            req.img_register = `uploads/publications/${date}${path.extname(file.originalname)}`
        }
        if (file.fieldname === "profile-input-input") {
            req.img_register = `uploads/avatars/${date}${path.extname(file.originalname)}`
        }
        cb(null, date + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

module.exports = {
    upload
}