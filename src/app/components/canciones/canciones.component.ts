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
      if(s.id == song.id){
        songInList = true;
      }
    });
    return songInList;
  }

  public showMoreSongs(): void {
    if (this.maxLen < this.songs.length)
      this.maxLen += 5;
    //console.log(this.maxLen);
  }

  public addSong(song: Song): void{
    if(this.selectedList){
      //console.log(this.selectedList);
      this.listService.addSong(this.selectedList, song);
    }
  }

}
