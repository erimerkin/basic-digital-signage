import { Request, Response } from "express";
import { PlaylistTrack } from "../models/playlistTrack.model";

const playlistService = require('../services/playlist.service');


async function getPlaylist(req: Request, res: Response) {
    const playlist = playlistService.getPlaylist();
    res.status(200).json(playlist);
}

async function addTrack(req: Request, res: Response) {
    const track = req.body as PlaylistTrack;
    playlistService.addTrack(track);
    res.status(200).json({ 
        status: 200,
        message: "Track added successfully" });
}

module.exports = {
    getPlaylist,
    addTrack
}