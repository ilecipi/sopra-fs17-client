import {Component, Input, OnInit} from '@angular/core';
import {ShipService} from "../../shared/services/ship.service";
import {GameService} from "../../shared/services/game.service";

import {Game} from "../../shared/models/game";
import {Ship} from "../../shared/models/ship";

@Component({
    selector: 'harbour',
    templateUrl: './harbour.component.html',
    styleUrls: ['./harbour.component.css']
})
export class HarbourComponent implements OnInit {

    //@Input()
    currentRound: number;
    currentGame: Game;
    currentShips: Ship[];

    market = [];
    pyramid = [];
    temple = [];
    burialchamber = [];
    obelisk = [];

    constructor(private shipService: ShipService, private gameService: GameService) {
    }

    ngOnInit() {

        //for testing purposes
        //TODO: delete
        this.currentRound = 1;

        this.currentGame = this.gameService.getCurrentGame();

        //get ships from api
        this.shipService.getShips(this.currentGame.id, this.currentRound)
            .subscribe(ships => {
                this.currentShips = ships;
            });
    }

    //dock ship on market
    onMarketDrop(e: any) {
        this.shipService.onDrop(e, this.currentShips, this.market);
    }

    //dock ship on pyramid
    onPyramidDrop(e: any) {
        this.shipService.onDrop(e, this.currentShips, this.pyramid);
    }

    //dock ship on temple
    onTempleDrop(e: any) {
        this.shipService.onDrop(e, this.currentShips, this.temple);
    }

    //dock ship on burial chamber
    onBurialchamberDrop(e: any) {
        this.shipService.onDrop(e, this.currentShips, this.burialchamber);
    }

    //dock ship on obelisk
    onObeliskDrop(e: any) {
        this.shipService.onDrop(e, this.currentShips, this.obelisk);
    }



}
