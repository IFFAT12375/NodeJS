const express = require("express");
const { getUrls, getUrlById, createUrl } = require("../controllers/url.controller");

const router = express.Router();

router.get("/", getUrls);
router.get("/:id", getUrlById);
router.post("/", createUrl);

module.exports = router;