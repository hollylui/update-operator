const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const newUpdate = { new: true };

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    if (!songs || songs.length === 0)
      return res.status(404).send("There is no song.");
    return res.status(200).send(songs);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

//! Task 1 -----------------------------
router.post("/add", async (req, res) => {
  const { body } = req;

  try {
    const newSong = await Song.create({ ...body });
    if (!newSong) return res.status(404).send("The song didn't added.");
    return res.status(200).send("New song is added.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

//! Task 2 ----------------------------
router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, artist, genre } = req.body;

  const updateContent = {
    title: title,
    artist: artist,
    genre: genre,
  };

  try {
    const song = await Song.findByIdAndUpdate(id, updateContent, newUpdate);
    if (!song) return res.status(404).send("Song is not found.");
    return res.status(200).send("Song is updated.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

//! Task 3 ----------------------------
router.patch("/addtag/:id", async (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;

  const addTag = {
    $push: { tags: tag },
  };

  try {
    const song = await Song.findByIdAndUpdate(id, addTag, newUpdate);
    if (!song) return res.status(404).send("Song is not found.");
    return res.status(200).send("Tags are updated.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

//! Task 4 -----------------------------
router.patch("/removetag/:id", async (req, res) => {
  const { id } = req.params;
  const { popnum } = req.query;

  const removeTag = {
    $pop: { tags: Number(popnum) },
  };

  try {
    const song = await Song.findByIdAndUpdate(id, removeTag, newUpdate);
    if (!song) return res.status(404).send("Song is not found.");
    return res
      .status(200)
      .send(popnum == 1 ? "Last tag is removed." : "First tag is removed.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

//! Task 5 -------------------------------
router.patch("/removefield/:id", async (req, res) => {
  const { id } = req.params;
  const { field } = req.query;
  const removeField = {
    $unset: {
      [field]: "",
    },
  };

  try {
    const song = await Song.findByIdAndUpdate(id, removeField, newUpdate);
    if (!song) return res.status(404).send("Song is not found.");
    return res.status(200).send(`${field} field is removed.`);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

module.exports = router;
