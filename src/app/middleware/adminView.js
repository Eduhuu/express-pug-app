const adminView = (req, res, next) => {  
    if (req.user.rol !== "admin"){
        return res.status(401).send("Acceso denegado")
    }
    next();
};

module.exports = adminView