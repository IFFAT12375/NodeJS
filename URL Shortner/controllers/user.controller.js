const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { setUser } = require("../service/auth");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    password: hashedPassword,
  });
  return res.redirect("/login");
}

async function login(req, res) {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (!user) {
    return res.status(401).json({
      message: "Invalid name or password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid name or password",
    });
  }

//   stateful auth
//   const sessionId = nanoid(32);
//   setUser(sessionId, {
//     userId: user._id.toString(),
//     expiresAt: Date.now() + 1000 * 60 * 60,
//   });
//   res.cookie("sessionId", sessionId, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 1000 * 60 * 60,
//   });
//   return res.redirect("/");

  //stateless jwt based auth

  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    jwtSecret,
    {
      expiresIn: "1h",
    },
  );

  //
  res.set("Authorization", `Bearer ${token}`);
  res.cookie("token", token, {
    // domain: "http://localhost:8000", //only that site can then access cookies
    // path: "/",
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  });

  return res.redirect("/");
}

module.exports = {
  register,
  login,
};
