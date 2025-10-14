import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {

    // creating a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    // create the JWT_SECRET inside the .env file

    // sending back the token to client
    res.cookies("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // in miliseconds
        httpOnly: true, // prevents XSS attacks: cross-site scripting attacks
        sameSite: "strict", // prevents CSRF attacks\
        secure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
};