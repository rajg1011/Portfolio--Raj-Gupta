require("dotenv").config();
var jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    //Getting Token
    const token = req.cookies.token;
    if (!token) {
      return res.send({
        status: false,
        message: "Not Logged In",
      });
    } else {
      //decoding JWT token
      await jwt.verify(token, process.env.JWT_SECRET_USER);
      next();
    }
  } catch (e) {
    res.send({
      status: false,
      message: "Invalid token",
    });
  }
};

module.exports = verifyUser;
