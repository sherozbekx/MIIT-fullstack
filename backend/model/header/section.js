const { type } = require("jquery");
const mongoose = require("mongoose");

const SectionSchema = mongoose.Schema({
    header: { type: mongoose.Schema.ObjectId, ref: "header", required: true },
    params_name: { type: String },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("section", SectionSchema)