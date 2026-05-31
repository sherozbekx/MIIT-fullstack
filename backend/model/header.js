const mongoose = require("mongoose");

const HeaderSchema = mongoose.Schema({
    gmenu: { type: mongoose.Schema.ObjectId, ref: "gmenu", required: true },
    name: { 
        uz: { type: String, required: true }, 
        ru: { type: String }, 
        eng: { type: String } 
    },
    active: {type: Boolean, enum: [true, false], default: false},
    link: { type: String },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("header", HeaderSchema)