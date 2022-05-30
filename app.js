const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const app = express();
const fbAuthRoute = require("./src/routes/facebook-auth-route");

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", fbAuthRoute);

module.exports = app;
