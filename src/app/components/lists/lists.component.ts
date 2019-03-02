import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { ListService } from '../../services/list.service';
import { List } from '../../models/list';
import { Song } from 'src/app/models/songs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, DoCheck {

  public selectedList: List;
  public moreInfoSong: boolean = false;

  constructor(private listService: ListService) { }

  ngOnInit() {
    //this.selectedList = this.listService.getSelectedList();
    //console.log(this.selectedList);
  }

  ngDoCheck() {
    this.selectedList = this.listService.getSelectedList();
    //console.log(this.selectedList);
  }

  public removeSong(song: Song): void {
    this.listService.removeSong(this.selectedList, song);
  }

  public removeList(): void {
    if (this.selectedList == this.listService.getSelectedList()) {
      if (confirm(`Are you sure that you want to delete the list "${this.selectedList.name}"`)) {
        this.listService.removeList();
      }
    }
  }

}
