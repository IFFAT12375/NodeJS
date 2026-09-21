const express = require("express");
const { nanoid } = require("nanoid");
const URL = require("../models/url.model");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const router = express.Router();

// Show register page
router.get("/register", (req, res) => {
    res.render("register");
});

// Register user
router.post("/register", async (req, res) => {

    try {
        const { name, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            password: hashedPassword
        });

        return res.redirect("/login");
    } catch (error) {
        console.error("Registration failed:", error);
        return res.status(500).send("Registration failed");
    }
});

// Show login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Login user
router.post("/login", async (req, res) => {

    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
        return res.status(401).send("Invalid name or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(401).send("Invalid name or password");
    }

    return res.redirect("/");
});

// Home page
router.get("/", async (req, res) => {

    const urls = await URL.find();

    res.render("home", {
        urls
    });
});

// Create short URL
router.post("/shorten", async (req, res) => {

    const { originalUrl } = req.body;

    const shortId = nanoid(6);

    await URL.create({
        originalUrl,
        shortId
    });

   return res.redirect("/");
});

// Redirect short URL
router.get("/:shortId", async (req, res) => {

    const { shortId } = req.params;

    const url = await URL.findOne({ shortId });

    if (!url) {
        return res.status(404).send("Short URL not found");
    }

    await URL.findOneAndUpdate(
        {shortId},
        {$inc: {clicks: 1}}
    );

    return res.redirect(url.originalUrl);
});

module.exports = router;