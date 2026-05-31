const mongoose = require("mongoose");

const GuidesSchema = mongoose.Schema({
    header: { type: mongoose.Schema.ObjectId, ref: "header", required: true },

    name: { 
        uz: { type: String }, 
        ru: { type: String }, 
        eng: { type: String }
    },

    description: { 
        uz: { type: String }, 
        ru: { type: String }, 
        eng: { type: String } 
    },

    image: { type: String },
    
    time: { type: String },
    timeStart: { type: String },
    timeEnd: { type: String },

    phone: { type: Number }, 
    email: { type: String }, 
    site: { type: String },
    
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("guide", GuidesSchema)