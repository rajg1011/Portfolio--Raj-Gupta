const express = require("express");
const bodyParser = require("body-parser");
const buycoffee = require("./routes/Razorpay.js");
const LoginToBlogs = require("./routes/Blogs.js");
const UserAuthentication = require("./routes/UserAuthentication.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

//Middlewares
//Pasrse JSON data to Js object
app.use(express.json());

//urlencoded parse form data(url encoded data) and make it available for req.body
app.use(bodyParser.urlencoded({ extended: true }));

//Parse cookie data from req and make it available for req.cookies
app.use(cookieParser());

//CORS (Cross-Origin Resource Sharing) middleware
//Specifies the origins that are allowed to access the resources.
app.use(
  cors({
    origin: ["http://localhost:5173"],
    //server allow cookies, header etc
    credentials: true,
  })
);

//General route to check
app.get("/", (req, res) => {
  res.send("Hi Raj");
});

// Razorpay
app.use("/api", buycoffee);

//Blogs
app.use("/api/db", LoginToBlogs);

//Authentication
app.use("/auth", UserAuthentication);

//Listen to port
app.listen(3000, () => {
  console.log("Server Is Started");
});
