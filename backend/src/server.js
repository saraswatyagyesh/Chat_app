// building an API on port 3000 and running it

// const express = require("express");
import express from "express";
import dotenv from "dotenv"; // to use .env file
import path from "path"; // deployment


import authRoutes from "./routes/auth.route.js"; // .js bcos it is a local file
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";


dotenv.config(); // configure dotenv

const app = express();
const __dirname = path.resolve(); // deployment

// to check if env file is working
console.log(process.env.PORT); // O/P 3000
const PORT = process.env.PORT || 3000;

app.use(express.json()); // middleware this will jsonize the req.body and send it forward

// app.use(PORT, (req, res) => {
//     res.send("Hail Hitler")
// }); // setting endpoint for messages
app.use("/api/auth", authRoutes); // set endpoint for authentication
app.use("/api/message", messageRoutes); // setting endpoint for messages


// make ready for deployment
if(process.env.NODE_ENV === "production") { // checking if we are in production

    app.use(express.static(path.join(__dirname, "../frontend/dist"))) // adding static assests

    // for any other endpoints
app.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
};


app.listen(PORT, () => {

    console.log("Server is runnning on port " + PORT)
    connectDB();
});