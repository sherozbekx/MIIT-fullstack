const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema({
    header: { type: mongoose.Schema.ObjectId, ref: "header", required: true },
    name: { 
        uz: { type: String, required: true }, 
        ru: { type: String, required: true }, 
        eng: { type: String, required: true } 
    },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})

module.exports = mongoose.model("department", DepartmentSchema)