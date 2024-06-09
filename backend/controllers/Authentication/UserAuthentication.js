const prisma = require("../../config/Prisma.js");
require("dotenv").config();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// For Sign Up functionality
const SignUpUser = async (req, res) => {
  // generation of random value added to a password
  const salt = await bcrypt.genSalt(10);
  const { name, email, password } = req.body;
  //Validation
  if (
    name.length == 0 ||
    name.trim().length == 0 ||
    email.length == 0 ||
    email.trim().length == 0 ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ||
    password.length == 0 ||
    password.trim().length == 0
  ) {
    return res.send({
      message: "Please Enter Valid Data",
      success: false,
    });
  }
  //Hash the password using salt
  const secPass = await bcrypt.hash(password, salt);
  if (!name || !email || !password) {
    return res.send({
      message: "Name, Email and Password are required",
      success: false,
    });
  }
  try {
    //Finding user from DB
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (findUser) {
      return res.send({
        message: "User already exists",
        success: false,
      });
    }
    // If no user then create one
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: secPass,
      },
    });
    // Generating JWT token for user and creating a cookie
    var token = jwt.sign({ email }, process.env.JWT_SECRET_USER, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {domain: "https://www.rajg.in.net", secure: true, sameSite: 'strict', httpOnly: true, maxAge: 360000 });
    res.json({
      message: "User created successfully",
      name,
      id: user.id,
      success: true,
    });
  } catch (e) {
    console.log("Error in SignUp of UserAuthentication.js", e);
    res.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  //Validation
  if (!email || !password) {
    return res.send({
      message: "Email and Password are required",
      success: false,
    });
  }
  if (
    email.length == 0 ||
    email.trim().length == 0 ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ||
    password.length == 0 ||
    password.trim().length == 0
  ) {
    return res.send({
      message: "Please Enter Valid Data",
      success: false,
    });
  }
  try {
    //Finding user from DB
    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!findUser) {
      return res.send({
        message: "User not found",
        success: false,
      });
    }
    //Compare password from DB and our password
    const passwordMatching = await bcrypt.compare(password, findUser.password);
    if (!passwordMatching) {
      return res.send({
        message: "Invalid Password",
        success: false,
      });
    }
    // if user is admin
    if (findUser.isAdmin) {
      //Generate JWT token and create cookie
      let admin_token = jwt.sign({ email }, process.env.JWT_SECRET_ADMIN, {
        expiresIn: "1h",
      });
      res.cookie("admin_token", admin_token, {domain: "https://www.rajg.in.net", secure: true, sameSite: 'strict', httpOnly: true, maxAge: 360000});
      return res.send({
        message: "Admin Login Successfully",
        name: findUser.name,
        id: findUser.id,
        isAdmin: true,
        success: true,
      });
    } else {
      //if user is simple user and not admin
      //Generate JWT token and create cookie
      let token = jwt.sign({ email }, process.env.JWT_SECRET_USER, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {domain: "https://www.rajg.in.net", secure: true, sameSite: 'strict', httpOnly: true, maxAge: 360000});
      return res.send({
        message: "User Login Successfully",
        name: findUser.name,
        id: findUser.id,
        isAdmin: false,
        success: true,
      });
    }
  } catch (e) {
    console.log("Error in Login of userAuthentication.js", e);
    res.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//Verify if logged in
const Verification = async (req, res) => {
  res.send({
    status: true,
  });
};

//Logout the user
const logout = async (req, res) => {
  try {
    //Clear Cookies
    res.clearCookie("token");
    res.clearCookie("admin_token");
    res.send({
      message: "Logout Successfully",
      success: true,
    });
  } catch (e) {
    console.log("Error in Logout of userAuthentication.js", e);
    res.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports = { LoginUser, SignUpUser, Verification, logout };
