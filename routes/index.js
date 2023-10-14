import express from 'express';
import {getAllBlogPosts,getBlogPostById,createBlogPost,updateBlogPost,deleteBlogPost} from "../controllers/Articles.js"

const router = express.Router()

//Get all blogposts
router.route("/").get(getAllBlogPosts)


//Get a blogpost by using id
router.route("/:id").get(getBlogPostById)


//Create a blogpost
router.route("/").post(createBlogPost)


//Update a blogpost
router.route("/:id").put(updateBlogPost)


//delete a blogPost
router.route("/:id").delete(deleteBlogPost)

export default router


