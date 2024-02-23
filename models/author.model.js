const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  firstName: { type: "String", required: [true, "First name is required"] },
  lastName: { type: "String", required: [true, "Last name is required"] },
  email: { type: "String", required: [true, "Email is Required"] },
});

const Author = new mongoose.model("author", authorSchema);

module.exports = Author;
