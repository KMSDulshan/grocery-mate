const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
    name: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, default: "User" }
});

module.exports = mongoose.model("User", userSchema);