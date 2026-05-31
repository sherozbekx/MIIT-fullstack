const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, // 998901299881
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "archive"], default: "active" },
    role: { type: String, enum: ["super-admin", "admin"], default: "admin" }
}, {
    timestamps: true,
})


// Hook
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("admin", AdminSchema)