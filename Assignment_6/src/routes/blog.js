const router = require("express").Router();
const Blog = require("../models/Blog");
const bodyparser = require("body-parser");

// Your routing code goes here
router.use(bodyparser());

router.get("/blog", async (req, res) => {
  try {
    let size = 0;
    if (req.query.page) {
      size = Number(req.query.page) * 3;
    }

    // console.log(req.query);

    if (size > 0) {
      const data = await Blog.find({
        topic: req.query.search
      }).limit(size);

      res.status(200).json({
        status: "success",
        message: "Blogs fetched successfully",
        result: data
      });
    } else {
      const data = await Blog.find();

      res.status(200).json({
        status: "success",
        message: "Blogs fetched successfully",
        result: data
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
});

router.post("/blog", async (req, res) => {
  try {
    const blogInfo = req.body;

    const data = await Blog.create({
      topic: blogInfo.topic,
      description: blogInfo.description,
      posted_at: blogInfo.posted_at,
      posted_by: blogInfo.posted_by
    });
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      result: data
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error"
    });
  }
});

router.put("/blog/:id", async (req, res) => {
  try {
    await Blog.updateOne({ _id: req.params.id }, req.body);
    const data = await Blog.findOne({
      _id: req.params.id
    });
    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      result: data
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Internal server error"
    });
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    const data = await Blog.deleteOne({ _id: req.params.id });
    if (data.deletedCount) {
      res.status(200).json({
        status: "success",
        message: "Blog deleted successfully"
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "No blog found with given id."
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Internal server error"
    });
  }
});

module.exports = router;
