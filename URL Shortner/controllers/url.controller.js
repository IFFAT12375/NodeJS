const URL = require("../models/url.model");
const { nanoid } = require("nanoid");

async function getUrlById(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }

  if (
    req.user.role !== "ADMIN" &&
    result.createdBy.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  return res.json({
    totalClicks: result.clicks,
    shortId: result.shortId,
    originalUrl: result.originalUrl,
  });
}

async function createUrl(req, res) {
  const body = req.body;

  if (!body.originalUrl) return res.status(400).json({ error: "url is required" });

  const shortId = nanoid(6);

  await URL.create({
    originalUrl: body.originalUrl,
    shortId,
    createdBy: req.user._id,
  });

  return res.redirect("/");
}

async function redirectToUrl(req, res) {
  const url = await URL.findOneAndUpdate(
    { shortId: req.params.shortId },
    { $inc: { clicks: 1 } },
    { new: true }
  );

  if (!url) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(url.originalUrl);
}

module.exports = {
    getUrlById,
    createUrl,
  redirectToUrl,
};