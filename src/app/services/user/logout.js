const logout = (req, res) => {
    res.clearCookie("token");
    res.clearCookie("valid_email");
    res.clearCookie("user_id");
    res.clearCookie("user_rol");
    res.status(200)
    res.redirect('/login');
    return res
}

module.exports = {
    logout
}