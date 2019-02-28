import { Injectable } from '@angular/core';

import { Song } from '../models/songs';
import songsJson from '../data/songs.json';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songs: Song[];

  constructor() {
    this.songs = songsJson;
  }

  public getSongs(): Song[] {
    return this.songs;
  }
}
