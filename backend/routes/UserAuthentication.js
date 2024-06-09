const express = require("express");
const {
  LoginUser,
  SignUpUser,
  Verification,
  logout,
} = require("../controllers/Authentication/UserAuthentication");
const verifyUser = require("../middleware/verifyUser");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

//Authenticatin routes as /auth/...
router.post("/login", LoginUser);
router.post("/sign-up", SignUpUser);
router.get("/verify", verifyUser, Verification);
router.get("/verify-admin", verifyAdmin, Verification);
router.get("/logout", logout);

module.exports = router;
