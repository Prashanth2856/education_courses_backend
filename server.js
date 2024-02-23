require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connect = require("./configs/db");
const bodyparser = require("body-parser");
const authenticate = require("./middlewares/authenticate");

app.use(express.json());
app.use(bodyparser.json());

const courseController = require("./controllers/course.controller");
app.use("/courses",  courseController);

const authController = require("./controllers/auth.controller");
app.use("/users", authController);

const authorController = require("./controllers/author.controller");
app.use("/authors", authorController);

app.listen(port, async () => {
  try {
    await connect();
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
