const userModel = require("../../models/user")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    }
});

const restorePassword = async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(400)
        res.render('page/restore-password', { alert_message: 'Todos los campos son requeridos.' });
        return res
    }

    const user_count = await userModel.countUsersByEmail(email)

    if (user_count == 0) {
        res.status(400)
        res.render('page/restore-password', { alert_message: 'No se encontro email.' });
        return res
    }

    const confirm_password_token = jwt.sign({ email: email }, process.env.JWT_SECRET);

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Correo de verificacion',
        text: `${process.env.URL_EMAIL_CONFIRM}/confirm-password?code=${confirm_password_token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.status(200)
    res.render('page/restore-password', { alert_message: 'Se envio el correo de verificacion.' });
    return res
    // .render('page/restore-password', { alert_message: "Se ha enviado un correo de recuperacion." })
}

module.exports = {
    restorePassword
}