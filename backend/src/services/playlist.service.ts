import { PlaylistTrack } from "../models/playlistTrack.model";

const playlist: PlaylistTrack[] = [];

function getPlaylist() : PlaylistTrack[]{
    return playlist;
}

function addTrack(track: PlaylistTrack) {
    playlist.push(track);
}

module.exports = {
    getPlaylist,
    addTrack
}