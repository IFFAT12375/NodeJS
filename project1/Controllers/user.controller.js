const User = require("../Models/user.model");

async function getUsers(req, res) {
    const users = await User.find();

    return res.status(200).json(users);
}

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json(user);
}

async function createUser(req, res) {
    const user = await User.create(req.body);

    return res.status(201).json(user);
}

async function updateUser(req, res) {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json(user);
}

async function deleteUser(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json(user);
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};