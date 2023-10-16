import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
       email: {
               type: String,
               required: [true, "Email is required"],
               unique:true
       },
       password: {
               type: String,
               required: [true, "Password is required"],
        },
        role: {
                type: String,
                enum: ["admin", "editor", "user"], 
                default: "user", 
              },
      // More required fileds can be added
})

export const User = mongoose.model("User",userSchema)
