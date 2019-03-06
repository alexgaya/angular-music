import { Component, OnInit, DoCheck } from '@angular/core';

import { SongService } from '../../services/song.service';
import { Song } from '../../models/songs';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit, DoCheck {

  public songs: Song[];
  public selectedList: List;

  public maxLen: number = 5;

  constructor(
    private songService: SongService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.songs = this.songService.getSongs();
  }

  ngDoCheck() {
    this.selectedList = this.listService.getSelectedList();
  }

  public checkSongInSelectedList(song: Song): boolean {
    let songInList: boolean = false;
    this.selectedList.songs.forEach(s => {
      if (s.id == song.id) {
        songInList = true;
      }
    });
    return songInList;
  }

  public showMoreSongs(): void {
    if (this.maxLen < this.songs.length)
      this.maxLen += 5;
  }

  public showLessSongs(): void {
    this.maxLen = 5;
  }

  public addSong(song: Song): void {
    if (this.selectedList) {
      this.listService.addSong(this.selectedList, song);
    }
  }

  public addAllSongs(): void {
    if (this.selectedList) {
      this.songs.forEach(s => {
        this.listService.addSong(this.selectedList, s);
      });
    }
  }
}
