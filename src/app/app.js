require('dotenv').config()
const helmet = require('helmet');
const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser");
const { client } = require("./db/index")
const router = require("./router/router")
const app = express()

// static files
const statics = __dirname.replace("/app", "/public")

// create port variable
app.set("port", process.env.PORT || 3000)

// setting views variables
// add path to templates
app.set("views", "./src/public/view") 
// declarate view engine as pug
app.set("view engine", "pug")

// use helmet middleware for security
app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "example.com"],
          "img-src": ["'self'", "https: data: blob:"],
        },
      },
    })
  );

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(express.static(statics))
app.use(cookieParser());

// Use Controladores
app.use(router)

client.connect(function (err) {
    if (err) throw err;
    console.log("Postgres Connected!");
});


module.exports = { app, client }

