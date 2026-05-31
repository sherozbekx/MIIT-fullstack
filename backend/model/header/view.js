const mongoose = require("mongoose");

const ViewSchema = mongoose.Schema({
    section: { type: mongoose.Schema.ObjectId, ref: "section", required: true },
    link: { 
        uz: { type: String, required: true }, 
        ru: { type: String, required: true }, 
        eng: { type: String, required: true } 
    },
    links: { 
        facebook: { type: String, required: true }, 
        twitter: { type: String, required: true }, 
        telegram: { type: String, required: true } 
    },
    images: [ { type: String, required: true } ],
    params_name: { type: String, required: true }, 
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("view", ViewSchema)