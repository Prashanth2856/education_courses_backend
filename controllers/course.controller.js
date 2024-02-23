const express = require("express");
const router = express.Router();

const Course = require("../models/course.model");

// Get all courses
router.get("/", async (req, res) => {
  const currentPage = +req.query.page;
  const coursesPerPage = +req.query.limit;
  const totalCourses = await Course.countDocuments();
  const totalPages = Math.ceil(totalCourses / coursesPerPage);
  try {
    const courses = await Course.find({})
      .populate({ path: "author", select: "firstName email -_id" })
      .skip(
        currentPage === 1 ? 0 : coursesPerPage * currentPage - coursesPerPage
      )
      .limit(coursesPerPage)
      .sort({ views: -1 })
      .lean()
      .exec();
    if (!currentPage && !coursesPerPage) {
      return res.send({
        totalCourses,
        courses,
      });
    } else {
      return res.send({
        totalCourses,
        coursesPerPage,
        currentPage,
        totalPages,
        coursesInThisPage: courses.length,
        courses,
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
});

// Get a single course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.find({ _id: req.params.id }).lean().exec();
    return res.status(200).send({ data: course });
  } catch (err) {
    console.log("Error", err);
  }
});

// Create a course
router.post("/", async (req, res) => {
  try {
    const course = await Course.findOne({ name: req.body.name }).lean().exec();
    if (course) {
      return res.status(403).send("Course already exists");
    } else {
      const course = await Course.create(req.body);
      return res.status(201).send({ data: course });
    }
  } catch (err) {
    console.log("Error", err);
  }
});

// Update a course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send({ data: course });
  } catch (err) {
    console.log("Error", err);
  }
});

// Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    return res.status(200).send({ data: course });
  } catch (err) {
    console.log("Error", err);
  }
});

module.exports = router;
