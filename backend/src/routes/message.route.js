import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
    res.send("Send message endpoint")
});

router.get("/recieve", (req, res) => {
    res.send("Recieve message endpoint")
});

export default router;