const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const leaderBoards = mongoose.model("leaderboards", new mongoose.Schema());
const textStreams = mongoose.model("textstreams", new mongoose.Schema());

router.get("/", (req, res) => {
    res.status(200).json({ youGot: "rooted" });
});

router.get("/para", async (req, res) => {
    try {
        const userData = await textStreams.find();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: "something is wrong with the server" });
        console.log(error);
    }
});

router.get("/top5", async (req, res) => {
    try {
        const userData = await leaderBoards.find();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

router.put("/top5", async (req, res) => {
    try {
        // console.log(typeof req.body);
        leaderBoards.collection.replaceOne({}, req.body);
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({
            error: "internal server error, could not update leaderboards",
        });
        console.log(error);
    }
});

module.exports = router;
