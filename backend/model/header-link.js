const mongoose = require("mongoose");

const HeaderLinkSchema = mongoose.Schema({
    gmenu: { type: mongoose.Schema.ObjectId, ref: "gmenu", required: true },
    name: { 
        uz: { type: String, required: true }, 
        ru: { type: String, required: true }, 
        eng: { type: String, required: true } 
    },
    link: { type: String, required: true },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("header-link", HeaderLinkSchema)