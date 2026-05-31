const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema({
    role: { type: String, enum: ["news", "event", "conference"], required: true},
    name: { 
        uz: { type: String, required: true }, 
        ru: { type: String, required: true }, 
        eng: { type: String, required: true } 
    },
    textarea: { 
        uz: { type: String, required: true }, 
        ru: { type: String, required: true }, 
        eng: { type: String, required: true } 
    },

    links: { 
        facebook: { type: String, default: "facebook.com" }, 
        twitter: { type: String, default: "x.com" }, 
        telegram: { type: String, default: "telegram.com" } 
    },

    image: { type: String, required: true },
    images: [ { type: String } ],
    activity_page: [ { type: mongoose.Schema.Types.ObjectId, ref: "header", required: false } ],
    params_number: { type: Number },
    params_name: { type: String },
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "archive"], default: "active" },
}, {
    timestamps: true,
})

module.exports = mongoose.model("news", NewsSchema)