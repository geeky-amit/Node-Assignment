const mongooose = require("mongoose");

const blogSchema = new mongooose.Schema({
  // Your code goes here
  //id, topic, description, posted_at, posted_by
  topic: { type: String },
  description: { type: String },
  posted_at: { type: Date },
  posted_by: { type: String }
});

const Blog = mongooose.model("blogs", blogSchema);

module.exports = Blog;
