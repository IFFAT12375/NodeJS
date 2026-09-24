const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
     role: { 
    type: String, 
    default: 'NORMAL',
    enum: ['NORMAL', 'ADMIN']
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;