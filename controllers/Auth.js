import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import {User} from "../models/User.js"
import ResponseHandler from "../middlwares/responseHandler.js"

export const registerUser = asyncHandler(async (req, res) => {
       const { email, password,role } = req.body
       if ((!email && !password) || (!email || !password)) {
           return ResponseHandler.error(res,"Email or password must not be null",400)
              
       } else {
              const existeduser = await User.findOne({ email:email })
              if (existeduser) {
                     return  ResponseHandler.error(res,"User  already exist",400)   
              }
              const hashedPassword = await bcrypt.hash(password,10)
              const user = new User({
                     email: email,
                     password: hashedPassword,
                     role: role || "user"
              })
              const registeredUser = await user.save()
              if (registeredUser) {
                     return  ResponseHandler.success(res,{email:registeredUser.email,_id:registeredUser.id,role: registeredUser.role},"User created successfully",201)
                     } else {
                      return  ResponseHandler.error(res,"Invalid user data",400)
              }
       }
})

export const loginUser = asyncHandler(async (req, res) => {
       const { email, password } = req.body
       if ((!email && !password) || (!email || !password)) {
              return ResponseHandler.error(res,"Email or password must not be null",400) 
       } else {
              const user = await User.findOne({ email })
              if (user && (await bcrypt.compare(password, user.password))) {
                     const accessToken = jwt.sign({
                            user: {
                                   email: user.email,
                                   id: user.id,
                                   role:user.role
                            }
                     }, "SECRET",{expiresIn:"1hr"})
                     return  ResponseHandler.success(res,{email:user.email,_id:user.id,accessToken,role: user.role},"User login successfully",200)
                     
              } else {
                     return ResponseHandler.error(res,"Invalid credantial",401) 
                     
              }    
       }
})


export const curentUser = asyncHandler(async (req, res) => {
         return     ResponseHandler.success(res,req.user,"Authorized",200)

})

