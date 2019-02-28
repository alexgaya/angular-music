import { Component, OnInit } from '@angular/core';

import { ListService } from '../../services/list.service';
import { List } from '../../models/list';
import { ListsComponent } from '../lists/lists.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  public lists: List[];
  public selected: number;
  public newList: string;
  public error: string;

  constructor(
    private listService: ListService
  ) { }

  ngOnInit() {
    //console.log(this.listService.getLists());
    this.lists = this.listService.getLists();
    console.log(this.lists);
  }

  public setSelectedList(): void {
    const list: List[] = this.lists.filter(e => e.id == this.selected);
    //console.log(list[0]);
    this.listService.setSelectedList(list[0]);
  }

  private checkIfNewListExists(): boolean {
    let exists: boolean = false;
    this.lists.forEach(l => {
      if (l.name == this.newList) {
        exists = true;
        this.error = `The name "${this.newList}" already exists`;
      }
    });
    return exists;
  }

  public addNewList(): void {
    console.log(this.newList);
    if (this.newList && !this.checkIfNewListExists()) {
      this.error = '';
      const id = this.lists.length > 0 ? Math.max(...this.lists.map(l => l.id)) + 1 : 0;
      this.listService.addList({
        id,
        name: this.newList,
        n_songs: 0,
        duration: 0,
        songs: []
      });
      this.newList = '';
      document.getElementById('newList').focus();
    }
  }

}
