const express = require("express");
const {
  createUrl,
  getUrlById,
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", createUrl);

router.get("/analytics/:shortId", getUrlById);

module.exports = router;