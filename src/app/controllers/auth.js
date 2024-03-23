const { login } = require("../services/user/login")
const { logout } = require("../services/user/logout")
const { register } = require("../services/user/register")
const { restorePassword } = require("../services/user/restorePassword")
const { confirmPassword } = require("../services/user/confirmPassword")
const { validConfirmPasswordToken } = require("../services/user/validConfirmPasswordToken")
const { updateUser } = require("../services/user/updateUser")
const {deleteUser} = require("../services/user/deleteUser")
const {blockUser} = require("../services/user/blockUser")
module.exports = {
    login,
    logout,
    register,
    restorePassword,
    confirmPassword,
    validConfirmPasswordToken,
    updateUser,
    deleteUser,
    blockUser
}