const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
let fbUser = null;

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            enableProof: true,
            profileFields: ["id", "displayName", "email", "photos"],
        },
        async (accessToken, refreshToken, profile, cb) => {
            fbUser = profile;
            return cb(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    return done(null, user);
});
passport.deserializeUser((user, done) => {
    return done(null, user);
});

const fbAuth = passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
});

const fbAuthCallback = passport.authenticate("facebook", {
    failureRedirect: "/error",
    successRedirect: "/profile",
});

const signIn = async (req, res) => {
    res.render("index.ejs");
};

const fbAuthSuccess = async (req, res) => {
    res.render("profile.ejs", { user: fbUser });
};

const logOut = async (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        return res.redirect("/");
    });
};

module.exports = { signIn, fbAuth, fbAuthCallback, fbAuthSuccess, logOut };
