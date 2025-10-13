export const signup = async(req, res) => {
    
    const {fullName, email, password } = req.body

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
        
    } catch (error) {
        
    }
    
    // res.send("Signup endpoint")
};