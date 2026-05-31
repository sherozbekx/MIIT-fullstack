const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema({
    department: { type: mongoose.Schema.ObjectId, ref: "department", default: null },
    address: { type: mongoose.Schema.ObjectId, ref: "region", default: null }, 
    name: { 
        uz: { type: String, required: true }, 
        ru: { type: String, required: true }, 
        eng: { type: String, required: true }
    },
    description: { 
        uz: { type: String, default: "" }, 
        ru: { type: String, default: "" }, 
        eng: { type: String, default: "" }
    },
    tasks: { 
        uz: { type: String, default: "" }, 
        ru: { type: String, default: "" }, 
        eng: { type: String, default: "" } 
    },
    image: { type: String, required: true },
    phone: { type: String, default: "" }, 
    location: { type: String, default: "" }, 
    email: { type: String, default: "" }, 
    site: { type: String, default: "" }, 
    time: { type: String, default: "" },
    timeStart: { type: String, default: "" },
    timeEnd: { type: String, default: "" },
    status: { type: String, enum: ["active", "archive"], default: "active" },
}, {
    timestamps: true,
})

module.exports = mongoose.model("staff", StaffSchema)