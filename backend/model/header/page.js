const { unique } = require("jquery");
const mongoose = require("mongoose");

const PageSchema = mongoose.Schema({
    header: { type: mongoose.Schema.ObjectId, ref: "header", required: true },
    name: { 
        uz: { type: String }, 
        ru: { type: String }, 
        eng: { type: String } 
    },
    textarea: { 
        uz: { type: String }, 
        ru: { type: String }, 
        eng: { type: String } 
    },
    links: { 
        facebook: { type: String }, 
        twitter: { type: String }, 
        telegram: { type: String } 
    },
    images: [ { type: String } ],
    params_name: { type: String, required: true, unique: true },
    params_number: { type: Number },
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("page", PageSchema)