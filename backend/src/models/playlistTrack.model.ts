export class PlaylistTrack {
    name: string;
    type: 'video' | 'image';
    url: string;
    duration: number;
  
    constructor(name: string, type: 'video' | 'image', url: string, duration: number) {
      this.name = name;
      this.type = type;
      this.url = url;
      this.duration = duration;
    }
  }