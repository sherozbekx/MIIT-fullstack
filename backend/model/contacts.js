const mongoose = require("mongoose");

const ContactsSchema = mongoose.Schema({
    address: { 
        uz: { type: String }, 
        ru: { type: String }, 
        eng: { type: String } 
    },
    workingTime: { 
        uz: { type: String }, 
        ru: { type: String }, 
        eng: { type: String } 
    },
    phone: { type: String },
    hotphone: { type: String },
    website: { type: String },
    email: { type: String },
    socialNet: { 
        x: { type: String }, 
        linkedIn: { type: String }, 
        facebook: { type: String }, 
        telegram: { type: String },
        instagram: { type: String } 
    },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("contacts", ContactsSchema)