import ResponseHandler from "../middlwares/responseHandler.js"


export const requireRole = (role) => {
       return (req, res, next) => {
         if (req.user && req.user.role === role) {
           next();
         } else {
           return ResponseHandler.error(res, "Access denied", 403);
         }
       };
     };
     