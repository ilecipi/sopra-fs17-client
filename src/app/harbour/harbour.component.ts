import { Component, OnInit } from '@angular/core';
import {ShipService} from "../shared/services/ship.service";

import {Ng2DragDropModule} from "ng2-drag-drop";

@Component({
  selector: 'harbour',
  templateUrl: './harbour.component.html',
  styleUrls: ['./harbour.component.css']
})

export class HarbourComponent implements OnInit {
  round: number;

  //Drag and drop ship
  items = [
    {name: "Ship1", type: "Ship"},
    {name: "Ship2", type: "Ship"},
    {name: "Ship3", type: "Ship"},
    {name: "Ship4", type: "Ship"},];
  droppedItems = [];

  onItemDrop(e: any) {
    // Get the dropped data here
    this.droppedItems.push(e.dragData);
    this.removeItem(e.dragData, this.items);
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map((e) => {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }




  constructor(private shipService: ShipService) { }

  ngOnInit() {
    this.round++;
    this.shipService.getShips(this.round);
  }

}
