const express = require("express");
const router = express.Router();
const fbAuthController = require("../controller/facebook-auth-controller");

router.get("/", fbAuthController.signIn);
router.get("/auth/facebook", fbAuthController.fbAuth);
router.get("/auth/facebook/callback", fbAuthController.fbAuthCallback);

router.get("/profile", fbAuthController.fbAuthSuccess);
router.get("/logout", fbAuthController.logOut);

module.exports = router;
