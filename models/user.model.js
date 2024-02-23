const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: "String", required: [true, " Name is required"] },
  email: { type: "String", required: [true, " Email is required"] },
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
