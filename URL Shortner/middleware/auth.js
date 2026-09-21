const sessions = require("../sessions");
const User = require("../models/user.model");

async function requireAuth(req, res, next) {

    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        return res.redirect("/login");
    }

    const userId = sessions.get(sessionId);

    if (!userId) {
        return res.redirect("/login");
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;

    next();
}

module.exports = requireAuth;