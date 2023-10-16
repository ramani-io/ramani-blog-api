import express from 'express';
import {getAllBlogPosts,getBlogPostById,createBlogPost,updateBlogPost,deleteBlogPost,addCommentToPost,createCategory,getAllCategories} from "../controllers/Articles.js"
import { validatetokenHandler } from "../middlwares/validatetokenHandler.js"
import {requireRole} from "../middlwares/roleHandler.js"
const router = express.Router()

//Get all blogposts
router.route("/").get(getAllBlogPosts)


//Get a blogpost by using id
router.route("/:id/blogpost").get(getBlogPostById)


//Create a blogpost
router.route("/create").post(validatetokenHandler,createBlogPost)


//Update a blogpost
router.route("/:id/update").put(updateBlogPost)


//Delete a blogPost
router.route("/:id/delete").delete(validatetokenHandler,deleteBlogPost)


// Comment a blogpost 
router.route('/:id/comments').post(validatetokenHandler,addCommentToPost)


// Admin to create categories

router.route("/createCategory").post(validatetokenHandler,requireRole("admin"),createCategory)



// Get all categories 
router.route("/categories").get(getAllCategories)


export default router


