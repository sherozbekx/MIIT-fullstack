const mongoose = require("mongoose");

const GMenuSchema = mongoose.Schema({
    name: { 
        uz: { type: String, required: true }, 
        ru: { type: String, required: true }, 
        eng: { type: String, required: true } 
    },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("gmenu", GMenuSchema)