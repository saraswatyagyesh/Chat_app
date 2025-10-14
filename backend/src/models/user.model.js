import mongoose from "mongoose";

// Creating a schema for Users
const userSchema = new mongoose.Schema({


    fullName:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    profilePic: {
        type: String,
        default: ""
    },
},
{ timestamps: true } // this will add the createdAt & updatedAt fields to the User
);

// Creating a User model based of the schema mentioned above
const User = mongoose.model("User", userSchema)

// below is how we will interact with Users in our database
export default User;