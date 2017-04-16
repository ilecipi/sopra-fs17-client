import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ShipService} from "../../shared/services/ship.service";
import {GameService} from "../../shared/services/game.service";

import {Game} from "../../shared/models/game";
import {Ship} from "../../shared/models/ship";
import {Stone} from "../../shared/models/stone";
import {MoveService} from "../../shared/services/move.service";
import {User} from "../../shared/models/user";

@Component({
    selector: 'harbour',
    templateUrl: './harbour.component.html',
    styleUrls: ['./harbour.component.css']
})
export class HarbourComponent implements OnInit {

    @Input()
    currentGame: Game;

    @Input()
    currentUser: User;

    @Input()
    currentShips: Ship[];

    market = [];
    pyramid = [];
    temple = [];
    burialchamber = [];
    obelisk = [];


    constructor(private shipService: ShipService,
                private gameService: GameService,
                private moveService: MoveService) {
    }

    ngOnInit() {

    }

    addStone(shipIndex: number, stoneIndex: number) {

        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1];
        let playerToken = this.currentUser.token;
        let shipNumber = shipIndex + 1; //the backend saves the ships as a number in [1,2,3,4]
        //the stones however, are saved as a normal index starting from 0;

        this.moveService.addStone(gameId, roundId, shipNumber, playerToken, stoneIndex)
            .subscribe(result => {
                if (result) {
                } else {
                }
            });
    }


    getShipSrc(index: number): string {
        let numStones = this.currentShips[index].stones.length;
        let stringSrc = '../../../assets/img/Ship';
        let ship: String = '';
        switch (numStones) {
            case 1 : {
                ship = '1-75';
                break;
            }
            case 2: {
                ship = '2-110';
                break;
            }
            case 3: {
                ship = '3-145';
                break;
            }
            case 4: {
                ship = '4-180';
                break;
            }
        }
        stringSrc += ship;
        stringSrc += 'x36.png';
        return stringSrc;
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
