const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function requireAuth(req, res, next) {
      const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : req.cookies.token;


  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    // return res.redirect("/login");
     return res.status(401).send("Invalid or expired token");
  }
}

module.exports = requireAuth;


// const { getUser } = require("../service/auth")
// const User = require("../models/user.model");

// async function requireAuth(req, res, next) {
//   const sessionId = req.cookies.sessionId;

//   if (!sessionId) {
//     return res.redirect("/login");
//   }

//   const session = getUser(sessionId);

//   if (Date.now() > session?.expiresAt) {
//     sessions.delete(sessionId);
//     return res.redirect("/login");
//   }
 
//   if (!session) {
//     return res.redirect("/login");
//   }

//   const user = await User.findById(session?.userId);

//   if (!user) {
//     return res.redirect("/login");
//   }

//   req.user = user;

//   next();
// }

// module.exports = requireAuth;
