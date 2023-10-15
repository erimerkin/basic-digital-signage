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
  const [formHidden, setFormHidden] = useState<boolean>(true);

  useEffect( () => {
    fetchPlaylist();
  }, []);

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

  // If the playlist is empty, start playing the first track
  useEffect(() => {
    if (currentlyPlaying == null && playlist.length > 0) {
      nextTrack({ track: playlist[0], index: 0 });
    }
  }, [playlist, currentlyPlaying]);


  // Fetch the playlist from the API
  const fetchPlaylist = async () => {
    setLoading(true);

    const apiUrl: string = "http://localhost:1955/api/playlist"

    await axios.get(apiUrl).then((response) => {
      const playlistData: PlaylistTrack[] = response.data;

      setPlaylist(playlistData);
    }).catch((error) => {
      console.log(error);
    });

    setLoading(false);
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
        <CollapsibleButton callback={() => {
          setFormHidden(!formHidden);
        }} />
        <NewTrackForm hidden={formHidden} onSubmit={addTrack} setHidden={setFormHidden} />
      </div>
    </div>
  );
};
