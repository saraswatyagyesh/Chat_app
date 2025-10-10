// building an API on port 3000 and running it

// const express = require("express");
import express from "express";
import dotenv from "dotenv"; // to use .env file
import authRoutes from "./routes/auth.route.js"; // .js bcos it is a local file
import messageRoutes from "./routes/message.route.js"


dotenv.config(); // configure dotenv

const app = express();

// to check if env file is working
console.log(process.env.PORT); // O/P 3000
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes); // set endpoint for authentication
app.use("/api/message", messageRoutes); // setting endpoint for messages




app.listen(PORT, () => console.log("Server is runnning on port " + PORT));