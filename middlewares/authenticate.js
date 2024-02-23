const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data);
      }
    });
  });
};

const authenticate = async (req, res, next) => {
  //Check if we have received the bearer token in the header
  const bearerToken = req.headers.authorization;

  //If not received, then throw an error
  if (!bearerToken || !bearerToken.startsWith("Bearer")) {
    return res.status(400).send({ Message: "Please provide a token" });
  }

  //If we found the token, we will extract the user from the token
  const token = bearerToken.split(" ")[1];
  try {
    const { user } = await verifyToken(token);
    // console.log("user", user);

    //attach the user to the request
    req.user = user;

    //return next
    return next();
  } catch (err) {
    return res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = authenticate;
