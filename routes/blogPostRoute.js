import express from 'express';
import { getAllBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost, createCategory, getAllCategories } from "../controllers/Articles.js"
import {addCommentToPost,editComment,deleteComment} from "../controllers/Comments.js"
import { validatetokenHandler } from "../middlwares/validatetokenHandler.js"
import {requireRole} from "../middlwares/roleHandler.js"
const router = express.Router()

//Get all blogposts
router.route("/").get(getAllBlogPosts)


//Get a blogpost by using id
router.route("/:id/blogpost").get(getBlogPostById)


//Create a blogpost
router.route("/createBlogpost").post(validatetokenHandler,createBlogPost)


//Update a blogpost
router.route("/:id/updateBlogpost").put(updateBlogPost)


//Delete a blogPost
router.route("/:id/deleteBlogpost").delete(validatetokenHandler,deleteBlogPost)


// Comment a blogpost 
router.route('/:id/comments').post(validatetokenHandler,addCommentToPost)

// Edit comment on a blogpost
router.route('/:blogpostId/blogpost/:commentId/editcomment').put(validatetokenHandler,editComment)

// delet comment on a blogpost
router.route('/:id/comment').delete(validatetokenHandler,deleteComment)

// Admin to create categories
router.route("/createCategory").post(validatetokenHandler,requireRole("admin"),createCategory)



// Get all categories 
router.route("/categories").get(getAllCategories)


export default router


