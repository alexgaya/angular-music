import { Injectable } from '@angular/core';

import { List } from '../models/list';
import { Song } from '../models/songs';
import listsJson from '../data/lists.json';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private lists: List[];
  private selectedList: List;

  constructor() {
    this.lists = listsJson;
  }

  public setSelectedList(list: List): void {
    this.selectedList = list;
  }

  public getSelectedList(): List {
    return this.selectedList;
  }

  public addList(list: List): void {
    this.lists.push(list);
  }

  public removeList(): void {
    this.lists.forEach((l, index) => {
      if(l == this.selectedList){
        this.lists.splice(index, 1);
      }
    });
    this.selectedList = null;
  }

  public getLists(): List[] {
    return this.lists;
  }

  private updateNsongs(listIndex: number): void {
    this.lists[listIndex].n_songs = this.lists[listIndex].songs.length;
  }

  private updateDuration(listIndex: number): void {
    this.lists[listIndex].duration = 0;
    this.lists[listIndex].songs.forEach(s => {
      this.lists[listIndex].duration += s.duration;
    });
  }

  public removeSong(list: List, song: Song) {
    this.lists.forEach((l, lIndex) => {
      if (l == list) {
        l.songs.forEach((s, Sindex) => {
          if (s == song) {
            l.songs.splice(Sindex, 1);
            this.updateNsongs(lIndex);
            this.updateDuration(lIndex);
          }
        })
      }
    });
  }

  public addSong(list: List, song: Song): void {
    let alreadyExists: boolean = false;

    this.lists.forEach(l => {
      if (l == list) {
        l.songs.forEach(s => {
          if (song == s) {
            alreadyExists = true;
          }
        });
      }
    });

    if (!alreadyExists) {
      this.lists.forEach((e, index) => {
        if (e == list) {
          e.songs.push(song);
          this.updateNsongs(index);
          this.updateDuration(index);
        }
      });
    }
  }
}
