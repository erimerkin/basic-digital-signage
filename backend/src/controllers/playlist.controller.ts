import { Request, Response } from "express";
import { PlaylistTrack } from "../models/playlistTrack.model";
import { playlistValidator } from "../validation/validator";

const playlistService = require('../services/playlist.service');

async function getPlaylist(req: Request, res: Response) {
    const playlist = playlistService.getPlaylist();
    res.status(200).json(playlist);
}

async function addTrack(req: Request, res: Response) {
    const data = req.body;

    if (!playlistValidator(data)) {
        const errorMessages = playlistValidator.errors?.map((error) => {
            return error.message;
        });

        console.log(errorMessages);

        res.status(400).json({ 
            status: 400,
            message: "Invalid request body",
            error: errorMessages?.join("; ")
         });
        return;
    } else {
        playlistService.addTrack(data as PlaylistTrack);
        res.status(200).json({ 
            status: 200,
            message: "Track added successfully" });
    }   
}

module.exports = {
    getPlaylist,
    addTrack
}