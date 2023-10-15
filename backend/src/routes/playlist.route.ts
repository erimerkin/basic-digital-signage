import express from "express";
const router = express.Router();

const playlistController = require('../controllers/playlist.controller');

router.get("/playlist", playlistController.getPlaylist);
router.post("/add", playlistController.addTrack);

module.exports = router;