const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

// Get all users
router.get("/", async (req, res) => {
  const user = await User.find({}).lean().exec();
  return res.status(200).send({ data: user });
});

// Signing up a user
router.post("/signup", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(403).send("User already exists");
  } else {
    const user = await User.create(req.body);
    return res.status(201).send({ data: user });
  }
});

// Signing in a user
router.post("/signin", async (req, res) => {
  const user = await User.findOne({
    $and: [{ name: req.body.name, email: req.body.email }],
  });
  if (!user) {
    return res.status(404).send("Invalid Credentials");
  } else {
    const token = newToken(user);
    return res.status(200).send({ user, token });
  }
});

module.exports = router;
