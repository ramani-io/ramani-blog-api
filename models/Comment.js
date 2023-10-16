import {mongoose} from "mongoose"


const commentSchema = new mongoose.Schema({
       text: {
         type: String,
         required: true,
       },
       // Author this is an author, author = createdBy  
       createdBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User", 
       },
       blogPost: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "BlogPost", 
       },
       createdAt: {
         type: Date,
         default: Date.now,
       },
     });
     
export const Comment = mongoose.model("Comment", commentSchema);
     