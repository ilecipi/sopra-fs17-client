import { Component, OnInit } from '@angular/core';
import {ShipService} from "../../shared/services/ship.service";

import {Ship} from "../../shared/models/ship";


@Component({
  selector: 'harbour',
  templateUrl: './harbour.component.html',
  styleUrls: ['./harbour.component.css']
})

export class HarbourComponent implements OnInit {
  round: number;
  //ships: Ship[];

  //default ships for testing
  ships: Ship[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

  market = [];
  pyramid= [];
  temple= [];
  burialchamber= [];
  obelisk= [];

  constructor(private shipService: ShipService) { }

  ngOnInit() {
    this.round = 1;

    //get ships for first round
    /*this.shipService.getShips(this.round)
       .subscribe(ships => {this.ships = ships;
        });*/
  }

  //dock ship on market
  onMarketDrop(e: any) {
    this.shipService.onDrop(e, this.ships, this.market);
  }

  //dock ship on pyramid
  onPyramidDrop(e: any) {
    this.shipService.onDrop(e, this.ships, this.pyramid);
  }

  //dock ship on temple
  onTempleDrop(e: any) {
    this.shipService.onDrop(e, this.ships, this.temple);
  }

  //dock ship on burial chamber
  onBurialchamberDrop(e: any) {
    this.shipService.onDrop(e, this.ships, this.burialchamber);
  }

  //dock ship on obelisk
  onObeliskDrop(e: any) {
    this.shipService.onDrop(e, this.ships, this.obelisk);
  }


}
