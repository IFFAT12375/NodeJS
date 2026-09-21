const URL = require("../models/url.model");

async function getUrls(req, res) {
    const urls = await URL.find();
    return res.status(200).json(urls);
}

async function getUrlById(req, res) {
    const url = await URL.findById(req.params.id);

    if (!url) {
        return res.status(404).json({
            message: "URL not found"
        });
    }

    return res.status(200).json(url);
}

async function createUrl(req, res) {
    const { originalUrl, shortId } = req.body;

    const url = await URL.create({
        originalUrl,
        shortId
    });
    return res.status(200).json(url);
}

module.exports = {
    getUrls,
    getUrlById,
    createUrl
};