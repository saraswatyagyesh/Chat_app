import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async () => {

    try {
        
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message: "Unauthorized - No token provided"})

        // if user has token, we need to decode it first with ENV.JWT_SECRET
        const decoded = jwt.verify(token, ENV.JWT_SECRET)
        if(!decoded) return res.status(401).json({message: "Unauthorized - Invalid token"})

        // if token is valid
        // first check the user
        const user = await User.findById(decoded.userId).select("-password") // check with UserId from user token and the database without involving password field
        if(!user) return res.status(404).json({message: "User not found"});

        // else
        // add this user to the request
        req.user = user

        // call the next function 
        next()

    } catch (error) {

        console.log("Error in protectRoute middleware: ", error);
        res.status(500).json({message: "Internal server error"});
    
    }
}