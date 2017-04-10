import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ShipService} from "../../shared/services/ship.service";
import {GameService} from "../../shared/services/game.service";

import {Game} from "../../shared/models/game";
import {Ship} from "../../shared/models/ship";
import {Stone} from "../../shared/models/stone";

@Component({
    selector: 'harbour',
    templateUrl: './harbour.component.html',
    styleUrls: ['./harbour.component.css']
})
export class HarbourComponent implements OnInit {

    @Input()
    currentGame: Game;

    @Input()
    currentShips: Ship[];

    market = [];
    pyramid = [];
    temple = [];
    burialchamber = [];
    obelisk = [];

    stoneClass: {};


    constructor(private shipService: ShipService, private gameService: GameService) {
    }

    ngOnInit() {

    }

    //dock ship on market
    //for now market has siteboard.id 1, can change depending on backend-team
    onMarketDrop(e: any) {
        this.shipService.onSiteboardDrop(e, this.currentShips, this.market, 1);
    }

    //dock ship on pyramid
    onPyramidDrop(e: any) {
        this.shipService.onSiteboardDrop(e, this.currentShips, this.pyramid, 2);
    }

    //dock ship on temple
    onTempleDrop(e: any) {
        this.shipService.onSiteboardDrop(e, this.currentShips, this.temple, 3);
    }

    //dock ship on burial chamber
    onBurialchamberDrop(e: any) {
        this.shipService.onSiteboardDrop(e, this.currentShips, this.burialchamber, 4);
    }

    //dock ship on obelisk
    onObeliskDrop(e: any) {
        this.shipService.onSiteboardDrop(e, this.currentShips, this.obelisk, 5);
    }
}
