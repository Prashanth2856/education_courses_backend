const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: { type: "String", required: [true, "Course name is required"] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: [true, "Author is required"],
  },
  image: { type: "String", required: [true, "Image is required"] },
  price: { type: "Number", required: [true, "Price is required"] },
  summary: { type: "String", required: [true, "Summary is required"] },
  description: { type: "String", required: [true, "Description is required"] },
  tags: { type: "String", required: [true, "Tag is required"] },
  likes: { type: "Number", default: 0 },
  views: { type: "Number", default: 0 },
  schedule: { type: "String", required: [true, "Schedule time is required"] },
});

const Course = new mongoose.model("course", courseSchema);

module.exports = Course;
