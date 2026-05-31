const { type } = require("jquery");
const mongoose = require("mongoose");

const SectionViewSchema = mongoose.Schema({
    section: { type: mongoose.Schema.ObjectId, ref: "section", required: true },
    name: { 
        uz: { type: String }, 
        ru: { type: String }, 
        eng: { type: String }
    },
    params_number: { type: String },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("section_view", SectionViewSchema)