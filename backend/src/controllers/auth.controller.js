import { generateToken } from "../lib/utils.js";

import User from "../models/user.model.js";
import bcrypt from "bcryptjs"



export const signup = async(req, res) => {
    
    const { fullName, email, password } = req.body

    try { // checks before saving user to our database. Like valid full name, email
        if(!fullName || !email || !password ){
        // returning with a response status code of 400 and a message
        return res.status(300).json({message:"All fields are required"})
        }

        if(password.length < 6 ){
        // returning with a response status code of 400 and a message
        return res.status(300).json({message:"Password is required to be at least 6 characters"})
        }

        // Chcecking is email is valid. Using Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        // Now we need to check if the user already exists. For this we need a model, so go to ./models/Users.js file
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"})

        // But let say user is new and has a password, then we will need to hash it using bcrypt
        // salt = await bcrypt.genSalt(LengthOfDigits)
        const salt = await bcrypt.genSalt(10)
        // Now hashing the password
        const hashedPassword = await bcrypt.hash(password, salt)

        // Now we will create a new user, passing the arguments
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        // Now what to do, Node to bana liya. Ab add karo
        if(newUser){
            // we will generate a token, pass the new user 
            generateToken(newUser._id, res)
            await newUser.save()

            // Now we wil give the status code of 201 i.e. something is created
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({message: "Invalid user data"})
        }



    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({mesage: "Internal server error"});
        
    }
    
    // res.send("Signup endpoint")
};