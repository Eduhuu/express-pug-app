const jwt = require("jsonwebtoken")

const validConfirmPasswordToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return false
    }
}

module.exports = {
    validConfirmPasswordToken
}