const express = require("express");
const URL = require("../models/url.model");
const requireAuth = require("../middleware/auth");
const { register, login } = require("../controllers/user.controller");
const {
  createUrl,
  redirectToUrl,
} = require("../controllers/url.controller");

const router = express.Router();

// Show register page
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", register);


// Show login page
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", login);


// router.get("/logout", (req, res) => {
//   const sessionId = req.cookies.sessionId;

//   if (sessionId) {
//     removeUser(sessionId);
//   }

//   res.clearCookie("sessionId");

//   return res.redirect("/login");
// });

//jwt route
router.get("/logout", (req, res) => {
  res.clearCookie("token");

  return res.redirect("/login");
});

// Home page
router.get("/", requireAuth, async (req, res) => {
  const urls = await URL.find({
    createdBy: req.user._id,
  });

  res.render("home", {
    urls,
  });
});

router.post("/shorten", requireAuth, createUrl);

router.get("/:shortId", redirectToUrl);

module.exports = router;