import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewTrackForm from './NewTrackForm';
import CollapsibleButton from './CollapsibleButton';

export interface PlaylistTrack {
  name: string;
  type: 'video' | 'image';
  url: string;
  duration: number;
}

export interface PlayingTrack {
  track: PlaylistTrack;
  index: number;
}

export const Playlist: React.FC = () => {
  const [playlist, setPlaylist] = useState<PlaylistTrack[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<PlayingTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [formHidden, setFormHidden] = useState<boolean>(false);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  // If the playlist is empty, start playing the first track
  useEffect(() => {
    if (currentlyPlaying == null && playlist.length > 0) {
      nextTrack({ track: playlist[0], index: 0 });
    }
  }, [playlist]);


  // Fetch the playlist from the API
  const fetchPlaylist = async () => {
    setLoading(true);

    axios.get('http://localhost:1955/api/playlist').then((response) => {
      setPlaylist(response.data);
    }).catch((error) => {
      console.log(error);
    });

    setLoading(false);
  }

  const nextTrack = (playlistTrack: PlayingTrack) => {

    const nextIndex = (playlistTrack.index + 1) % playlist.length;

    setCurrentlyPlaying({
      track: playlistTrack.track,
      index: playlistTrack.index,
    });
    const queuedTrack = playlist[nextIndex];

    setTimeout(() => {
      console.log('next track');

      nextTrack({ track: queuedTrack, index: nextIndex });
    }, playlistTrack.track.duration * 1000);
  }

  const addTrack = (track: PlaylistTrack) =>  {
    setPlaylist([...playlist, track]);
  }


  return (
    <div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : currentlyPlaying != null ? (
          currentlyPlaying.track.type === 'video' ? (
            <video
              id="background-content"
              src={currentlyPlaying.track.url}
              autoPlay
              muted
            />
          ) : (
            <img
              id="background-content"
              src={currentlyPlaying.track.url} />
          )
        ) : (
          <div>Nothing playing</div>
        )}
      </div>
      <div>
        <CollapsibleButton callback={setFormHidden} />
        <NewTrackForm hidden={formHidden} onSubmit={addTrack} setHidden={setFormHidden} />
      </div>
    </div>
  );
};
