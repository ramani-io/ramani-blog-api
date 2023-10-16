import express from "express";
import { loginUser, registerUser, curentUser } from "../controllers/Auth.js"
import {validatetokenHandler} from "../middlwares/validatetokenHandler.js"

const router = express.Router()

//Login user route 
router.route("/login").post(loginUser)


//Register user route
router.route("/register").post(registerUser)


//Get current user route
router.route("/current").get(validatetokenHandler,curentUser)






export default router