import { Blogpost } from "../models/Blogpost.js";
import asyncHandler from "express-async-handler";

export const PostArticle = async (req, res) => {
  // Post an article to the DB
};

export const getAllBlogPosts = async (req, res) => {
  const Post = await Blogpost.find({});
  res.status(200).json(Post);
};

export const getBlogPostById = asyncHandler(async (req, res) => {
  const blogpost = await Blogpost.findById(req.params.id);
  if (!blogpost) {
    res.status(404);
    throw new Error("Blogpost not found");
  }
  res.status(200).json(blogpost);
});

export const createBlogPost = asyncHandler(async (req, res) => {
  const { title, createdBy, description } = req.body;
  if (!title || !createdBy || !description) {
    res.status(400);
    throw new Error("Please all the fields required");
  } else {
    try {
      const Post = new Blogpost({
        title,
        createdBy,
        description,
        createdAt: new Date().toISOString(),
      });
      await Post.save();
      res.status(201).json({ message: "Post created" });
    } catch (err) {
      console.log(err, "This is an error");
    }
  }
});

export const updateBlogPost = asyncHandler(async (req, res) => {
  const blogpost = await Blogpost.findById(req.params.id);
  if (!blogpost) {
    res.status(404);
    throw new Error("Blogpost not found");
  } else {
    const updateBlogPost = await Blogpost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateBlogPost);
  }
});


export const deleteBlogPost = asyncHandler(async (req, res) => {
  const blogpost = await Blogpost.findById(req.params.id);
  if (!blogpost) {
    res.status(404)
    throw new Error("Blogpost not found")
  } 
  try { 
    await blogpost.deleteOne({ _id: req.params.id });
    res.status(200).json(blogpost)

  } catch (err) {
    console.log(err,"This is an error")
  }
});