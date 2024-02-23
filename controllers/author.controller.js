const express = require("express");
const router = express.Router();

const Author = require("../models/author.model");

router.get("/", async (req, res) => {
  const authors = await Author.find().lean().exec();
  return res.status(200).send({ data: authors });
});

router.get("/:id", async (req, res) => {
  const authors = await Author.findById(req.params.id).lean().exec();
  return res.status(200).send({ data: authors });
});

router.post("/", async (req, res) => {
  try {
    const author = await Author.findOne({ email: req.body.email });
    if (author) {
      return res.status(403).send("Author already exists");
    } else {
      const author = await Author.create(req.body);
      return res.status(201).send({ data: author });
    }
  } catch (err) {
    console.log("Error", err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send({ data: author });
  } catch (err) {
    console.log("Error", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    return res.status(200).send({ data: author });
  } catch (err) {
    console.log("Error", err);
  }
});

module.exports = router;
