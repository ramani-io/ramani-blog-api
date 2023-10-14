import { Blogpost } from "../models/Blogpost.js";
import asyncHandler from "express-async-handler";
import ResponseHandler from "../middlwares/responseHandler.js"
export const PostArticle = async (req, res) => {
  // Post an article to the DB
};

export const getAllBlogPosts = async (req, res) => {
  const Post = await Blogpost.find({});
  ResponseHandler.success(res,Post,"Get all blogpost successfully",200)
};

export const getBlogPostById = asyncHandler(async (req, res) => {
  const blogpost = await Blogpost.findById(req.params.id);
  if (!blogpost) {
    res.status(404);
    throw new Error("Blogpost not found");
  }
  ResponseHandler.success(res,blogpost,"Get blogpost by id successfully",200)
});

export const createBlogPost = asyncHandler(async (req, res) => {
  const { title, createdBy, description } = req.body;
  if (!title || !createdBy || !description) {
    ResponseHandler.error(res,"",400)
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
      ResponseHandler.success(res, Post, 'BlogPost created successfully',200)
    } catch (err) {
      console.log(err, "This is an error");
    }
  }
});

export const updateBlogPost = asyncHandler(async (req, res) => {
  const blogpost = await Blogpost.findById(req.params.id);
  if (!blogpost) {
    ResponseHandler.error(res,"BlogPost not Found",404)
    throw new Error("Blogpost not found");
  } else {
    const updateBlogPost = await Blogpost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    ResponseHandler.success(res, updateBlogPost, 'BlogPost updated successfully',200);

  }
});


export const deleteBlogPost = asyncHandler(async (req, res) => {
  const blogpost = await Blogpost.findById(req.params.id);
  if (!blogpost) {
    ResponseHandler.error(res,blogpost,"BlogPost not found",404)
    throw new Error("Blogpost not found")
  } 
  try { 
    await blogpost.deleteOne({ _id: req.params.id });
    ResponseHandler.success(res,blogpost,"BlogPost deleted successfully",200)

  } catch (err) {
    console.log(err,"This is an error")
  }
});