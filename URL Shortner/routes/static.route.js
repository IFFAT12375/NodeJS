const express = require("express");
const URL = require("../models/url.model");
const requireAuth = require("../middleware/auth");
const requireRole = require("../middleware/role");
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
router.get(
  "/",
  requireAuth,
  requireRole("NORMAL", "ADMIN"),
  async (req, res) => {
  const query = req.user.role === "ADMIN"
    ? {}
    : { createdBy: req.user._id };

  const urls = await URL.find(query).populate("createdBy", "name role");

    res.render("home", {
      urls,
    });
  },
);

router.post("/shorten", requireAuth, requireRole("NORMAL", "ADMIN"), createUrl);

router.get("/:shortId", redirectToUrl);

module.exports = router;