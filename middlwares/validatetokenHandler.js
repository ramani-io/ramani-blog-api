import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import ResponseHandler from "./responseHandler.js";




export const validatetokenHandler = asyncHandler(async (req, res, next) => {
       let token; 

       let authHeader = req.headers.Authorization || req.headers.authorization
       if (authHeader && authHeader.startsWith("Bearer")) {
              token = authHeader.split(" ")[1]
              jwt.verify(token, "SECRET", (err,decoded) => {
                     if (err) {
                           return ResponseHandler.error(res,"Unauthorized",401)
                     } else {
                            req.user = decoded.user
                            next()
                     }
              })
              if (!token) {
                      return ResponseHandler.error(res,"Token expired",401)
              }
       }
})