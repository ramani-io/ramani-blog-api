import {mongoose} from "mongoose"


const blogpostSchema = new mongoose.Schema({
       title: {
              type: String,
              required: true
       },
       description: {
              type: String,
              required: true
       },
       // Author this is an author, author = createdBy  
       createdBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
       },
       comments: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
              },
       ],
       category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Category',
       },
       createdAt: {
              type: Date,
              default: Date.now,
       },

       // More fields can be added 
})

export const Blogpost = mongoose.model("Blogpost",blogpostSchema)
