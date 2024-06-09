const prisma = require("../../config/Prisma.js");

const CreatePost = async (req, res) => {
  const { tag, post_data, route, main_content } = req.body;
  //Validations
  if (!tag || !post_data || !route || !main_content) {
    return res.json({
      message: "All Inforation is required",
      success: false,
    });
  }
  if (
    tag.length == 0 ||
    tag.trim().length == 0 ||
    route.length == 0 ||
    route.trim().length == 0
  ) {
    return res.json({
      message: "Correct Tag is required",
      success: false,
    });
  }
  if (
    post_data.length < 2000 ||
    post_data.trim().length < 2000 ||
    main_content.length < 150 ||
    main_content.trim().length < 150
  ) {
    res.json({
      message: "Post Data and Main Content must be at least 2000 characters",
      success: false,
    });
    return;
  }
  // Create Post in DB
  try {
    await prisma.post.create({
      data: {
        tag,
        post_data,
        route,
        main_content,
      },
    });
    res.json({
      message: "Post created successfully",
      success: true,
    });
  } catch (e) {
    console.log("Error in CreatePost of Post.js", e);
    res.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const GetPost = async (req, res) => {
  try {
    // Getting Data from DB
    const data = await prisma.post.findMany();
    res.json({
      message: data,
    });
  } catch (e) {
    console.log("Error in GetPost of Post.js", e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
module.exports = { GetPost, CreatePost };
