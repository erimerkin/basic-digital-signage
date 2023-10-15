import { PlaylistTrack } from "../models/playlistTrack.model";

const playlist: PlaylistTrack[] = [
    new PlaylistTrack("Yoga", "image", "/static/images/yoga.jpg", 5),
    new PlaylistTrack("Earth", "video", "/static/videos/earth.mp4", 30),
    new PlaylistTrack("Bench", "image", "/static/images/bench.jpg", 5),
];

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