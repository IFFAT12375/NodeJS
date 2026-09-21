const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function register(req, res) {

    const { name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        password: hashedPassword
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name
        }
    });
}


async function login(req, res) {

    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
        return res.status(401).json({
            message: "Invalid name or password"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid name or password"
        });
    }

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name
        }
    });
}


module.exports = {
    register,
    login
};