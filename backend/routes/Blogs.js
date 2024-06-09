const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  PostComment,
  GetComment,
  DeleteComment,
} = require("../controllers/Blogs/Comments");
const { CreatePost, GetPost } = require("../controllers/Blogs/Post");
const VerifyBasedOnRole = require("../middleware/VerifyBasedOnRole");
const router = express.Router();





// Different routes as - /api/db/...
router.post("/create", verifyAdmin, CreatePost);
router.get("/getblogs", GetPost);
router.post("/postcomment", VerifyBasedOnRole, PostComment);
router.post("/getcomment", GetComment);
router.post("/deletecomment", VerifyBasedOnRole, DeleteComment);

module.exports = router;
