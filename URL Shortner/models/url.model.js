const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    originalUrl: String,

    shortId: String,

    createdAt: {
        type: Date,
        default: Date.now
    },

    clicks: {
        type: Number,
        default: 0
    }
});


const URL = mongoose.model("URL", urlSchema);

module.exports = URL;