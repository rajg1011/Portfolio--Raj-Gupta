const prisma = require("../../config/Prisma.js");

const GetComment = async (req, res) => {
  const { post_id } = req.body;
  //validation
  if (!post_id) {
    return res.json({
      message: "Post Id Required",
      success: false,
    });
  }
  try {
    //Get Comment from DB
    const comment_data = await prisma.comment.findMany({
      where: {
        post_id: post_id,
      },
      select: {
        comment_description: true,
        user_id: true,
        id: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({
      comment_data,
      success: true,
    });
  } catch (e) {
    console.log("Error in GetComment of Comment.js", e);
    res.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const PostComment = async (req, res) => {
  const { comment_description, post_id, user_id } = req.body;
  //validation
  if (!comment_description || !post_id || !user_id) {
    return res.json({
      message: "All Inforation is required",
      success: false,
    });
  }
  if (
    comment_description.length < 10 ||
    comment_description.trim().length < 10
  ) {
    return res.json({
      message: "Correct Comment is required",
      success: false,
    });
  }
  try {
    // Getting Comments from DB
    await prisma.comment.create({
      data: {
        comment_description,
        post_id,
        user_id,
      },
    });
    res.json({
      message: "Commented",
      success: true,
    });
  } catch (e) {
    console.log("Error in PostComment of Comment.js", e);
    res.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const DeleteComment = async (req, res) => {
  //Validation
  const { comment_id } = req.body;
  console.log(comment_id);
  if (!comment_id) {
    return res.json({
      message: "Comment Id Required",
      success: false,
    });
  }

  try {
    const { isAdmin } = req.body;
    //Deleting the comment if admin
    if (isAdmin) {
      await prisma.comment.delete({
        where: {
          id: comment_id,
        },
      });
    } else {
      const { user_id } = req.body;

      // Validation
      if (!user_id) {
        return res.json({
          message: "User Id is required",
          success: false,
        });
      }
      //Deleting the comment if user
      await prisma.comment.delete({
        where: {
          id: +comment_id,
          user_id: +user_id,
        },
      });
    }
    res.json({
      message: "Comment Deleted Successfully",
      success: true,
    });
  } catch (e) {
    console.log("Error in DeleteComment Comment.js", e);
    res.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports = { PostComment, GetComment, DeleteComment };
