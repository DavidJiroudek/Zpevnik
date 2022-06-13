var express = require("express");
const auth = require("../middleware/auth");
const Song = require("../models/Song");
var router = express.Router();

router.get("/getAllSongs", async (req, res) => {
    try {
        const songs = await Song.find({}, {songName:1, _id:1});
        res.send(songs);
    } catch(e) {
        res.status(500).send();
    }
});

router.get("/getSongData", async (req, res) => {
    try {
        const _id = req.query.songId;
        const songs = await Song.findById(_id);
        res.send(songs);
    } catch(e) {
        res.status(500).send();
    }
});
router.get("/removeSong", auth, async (req, res) => {
    try {
        const _id = req.query.songId;
        await Song.findByIdAndRemove(_id);
        res.send("Píseň byla smazána");
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;