import {Component, HostBinding, Input, OnInit} from '@angular/core';
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
        //TODO: delete line
        this.currentRound = 1;

        this.currentGame = this.gameService.getCurrentGame();

        //get ships from api
        this.shipService.getShips(this.currentGame.id, this.currentRound)
            .subscribe(ships => {
                this.currentShips = ships;
            });
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


    updateShips(ships: Ship[]) {
        for (let ship of ships) {
            for (let stone of ship.stones) {
                if (stone.color == 'black') {
                }
                else if (stone.color == 'brown') {
                }
                else if (stone.color == 'grey') {
                }
                else if (stone.color == 'white') {
                }
                else return;
            }
        }
    }
}
