const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, default: "User" }
});

module.exports = mongoose.model("User", userSchema);