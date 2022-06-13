var express = require("express");
const auth = require("../middleware/auth");
const Song = require("../models/Song");
var router = express.Router();

router.post("/", auth, async (req, res) => {
    // console.log(req.body);
    // res.status(201).send(req.body);


    const song = new Song(req.body)

    try {
    await song.save()
        res.status(201).send("Song saved")
    }catch(e) {
        res.status(400).send(e)
    }
});

module.exports = router;