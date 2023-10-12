import mongoose from "mongoose"

const userSchema = new Schema({
       username: {
               type: String,
               required: [true, "Username is required"],

       },
       email: {
               type: String,
               required: [true, "Email is required"],
               unique:true
       },
       password: {
               type: String,
               required: [true, "Password is required"],
       },
      // More required fileds can be added
})

export const User = mongoose.model("User",userSchema)
