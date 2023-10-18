import asyncHandler from "express-async-handler";
import ResponseHandler from "../middlwares/responseHandler.js";
import { Blogpost} from "../models/Blogpost.js"
import { Comment } from "../models/Comment.js"


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
         ResponseHandler.error(res, 'Failed to add a comment', 500);
       }
})
 

export const editComment = asyncHandler(async (req, res) => {
       const { text } = req.body
       if (!text) {
              return ResponseHandler.error(res,"Please provide the required field",400)
       }
       const blogPost = await Blogpost.findById(req.params.blogpostId)
       if (!blogPost) {
             return ResponseHandler.error(res, "Blogpost not found", 404)
       } else {
              try { 
                     const comment = await Comment.findById(req.params.commentId)
                     if (!comment) {
                       return ResponseHandler.error(res, "Comment not found", 404)
                           
                     }
                     if (comment.createdBy.toString() !== req.user.id) {
                            return ResponseHandler.error(res, "You are not authorized to edit this comment", 403);
                          }
                     const updatedComment = await Comment.findByIdAndUpdate(
                            req.params.commentId,
                            req.body,
                            {new: true}
                     )
                     ResponseHandler.success(res,updatedComment,"Comment updated successfully",200)
              } catch (err) {
                   return  ResponseHandler.error(res,"Something went wrong",400)
              }
       }


})

export const deleteComment = asyncHandler(async (req, res) => {
       const comment = await Comment.findById(req.params.id)
       if (!comment) {
            return ResponseHandler.error(res,"Comment not found",404)  
       } if (comment.createdBy.toString() !== req.user.id) {
              return ResponseHandler.error(res, "You are not authorized to delete this comment", 403);
       } else {
              await comment.deleteOne({ _id: req.params.id });
              ResponseHandler.success(res,comment,"Comment deleted successfully",200)
       }
})