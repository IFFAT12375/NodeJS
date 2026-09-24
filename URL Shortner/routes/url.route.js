const express = require("express");
const {
  createUrl,
  getUrlById,
} = require("../controllers/url.controller");
const requireAuth = require("../middleware/auth");
const requireRole = require("../middleware/role");

const router = express.Router();

router.post("/", requireAuth, requireRole("NORMAL", "ADMIN"), createUrl);

router.get(
  "/analytics/:shortId",
  requireAuth,
  requireRole("NORMAL", "ADMIN"),
  getUrlById,
);

module.exports = router;