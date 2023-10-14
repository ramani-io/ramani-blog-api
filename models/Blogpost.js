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
       createdBy: {
              type: String,
              required: true,
       },
       createdAt: {
              type: Date,
              default: Date.now,
       },

       // More fields can be added 
})

export const Blogpost = mongoose.model("Blogpost",blogpostSchema)
