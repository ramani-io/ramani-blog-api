import { Blogpost } from "../models/Blogpost.js";
import asyncHandler from "express-async-handler";
import ResponseHandler from "../middlwares/responseHandler.js"
import { Category } from "../models/Category.js";
import { Comment } from "../models/Comment.js";
export const PostArticle = async (req, res) => {
  // Post an article to the DB
};

export const getAllBlogPosts = asyncHandler(async (req, res) => {
  const Post = await Blogpost.find({}).populate('comments').populate('category')
  ResponseHandler.success(res,Post,"Get all blogpost successfully",200)
})

export const getBlogPostById = asyncHandler(async (req, res) => {
  const blogpost = await Blogpost.findById(req.params.id).populate('comments')
  if (!blogpost) {
    res.status(404);
    throw new Error("Blogpost not found");
  }
  ResponseHandler.success(res,blogpost,"Get blogpost by id successfully",200)
});



export const createBlogPost = asyncHandler(async (req, res) => {
  const { title, createdBy, description,categoryId } = req.body;
  if (!title || !description || !categoryId) {
     return ResponseHandler.error(res,"All fields must not be null",400)
  }else {
    try {
      const category = await Category.findOne({ _id: categoryId});
      if (!category) {
        return ResponseHandler.error(res, "Invalid category", 400);
      }
      const Post = new Blogpost({
        title,
        createdBy,
        description,
        createdBy: req.user.id,
        category: categoryId,
        createdAt: new Date().toISOString(),
      });
      const blogPost = await Post.save();
     if (blogPost) {
       ResponseHandler.success(res, blogPost, 'BlogPost created successfully',200)
     }
    } catch (err) {
      ResponseHandler.error(res, 'Error on creating a blogpost',400)
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

export const addCommentToPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  try {
    const blogPost = await Blogpost.findById(req.params.id);

    if (!blogPost) {
      return ResponseHandler.error(res, 'Blog post not found', 404);
    }
    const comment = new Comment({
      text,
      createdBy: req.user.id, 
      blogPost: req.params.id,
      createdAt: new Date().toISOString(),
    });

    const savedComment = await comment.save();    
    blogPost.comments.push(savedComment._id);
    await blogPost.save();
    ResponseHandler.success(res, savedComment, 'Comment added successfully', 201);
  } catch (error) {
    console.log("The error here it is",error)
    ResponseHandler.error(res, 'Failed to add a comment', 500);
  }
})

export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body
    const category = await Category.findOne({ name })
  if (!name) {
     return ResponseHandler.error(res,"Please provide the category name",400)
      
    }
    if (category) {
       return ResponseHandler.error(res,"Category already exist",400)
    } else {
      const blogpostCategory = new Category({
            name,
            createdBy:req.user.id
        })
        await blogpostCategory.save()
      if (blogpostCategory) {
         return ResponseHandler.success(res,blogpostCategory,"Blogcategory created successefully",201)
      } else {
           return  ResponseHandler.error(res,"Something went wrong",400)
        }
      }


})

export const getAllCategories = asyncHandler(async (req, res) => {
        const categories = await Category.find({})
        if (!categories) {
           return ResponseHandler.error(res,"Categories not found",404)  
        } else {
          return ResponseHandler.success(res,categories,"All categories",200)
        }
})