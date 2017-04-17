import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ShipService} from "../../shared/services/ship.service";
import {GameService} from "../../shared/services/game.service";

import {Game} from "../../shared/models/game";
import {Ship} from "../../shared/models/ship";
import {Stone} from "../../shared/models/stone";
import {MoveService} from "../../shared/services/move.service";
import {User} from "../../shared/models/user";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'harbour',
    templateUrl: './harbour.component.html',
    styleUrls: ['./harbour.component.css']
})
export class HarbourComponent implements OnInit {

    @Input()
    private currentGame: Game;

    @Input()
    private currentUser: User;

    @Input()
    private currentShips: Ship[];

    private selectedShip = -1;

    market = [];
    pyramid = [];
    temple = [];
    burialchamber = [];
    obelisk = [];


    private styleSubscription: any;
    //styles required to move each ship in the correct place.
    private style1 = document.createElement('style');
    private style2 = document.createElement('style');
    private style3 = document.createElement('style');
    private style4 = document.createElement('style');

    private styleSelectedShip = document.createElement('style');

    constructor(private shipService: ShipService,
                private gameService: GameService,
                private moveService: MoveService) {
    }

    ngOnInit() {
        //styles initialization for selection feature
        this.styleSelectedShip.innerHTML = '';
        document.getElementsByTagName('harbour')[0].appendChild(this.styleSelectedShip);

        //styles initializtion for ships position
        this.initStyleChildren();
        this.addStyleChildren();

        //polling ship positions
        this.pollShipPositions();

    }

    addStone(shipIndex: number, stoneIndex: number) {

        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1]; //roundId is the last number in the rounds array of the game.
        let playerToken = this.currentUser.token;
        let shipId = this.currentShips[shipIndex].id; //post request is going to require current ship ID.
        // Stone index is going to start from zero also for the backend;

        this.moveService.addStone(gameId, roundId, shipId, playerToken, stoneIndex)
            .subscribe(result => {
                if (result) {
                } else {
                }
            });
    }


    getShipSrc(index: number): string {
        let numStones = this.currentShips[index].stones.length;
        let stringSrc = '../../../assets/img/Ship';
        let ship = '';
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


    pollShipPositions(): void {
        this.styleSubscription = Observable.interval(400).subscribe(x => {
            this.setShipPositions();
        })

    }

    setShipPositions(): void {

        //style[i] corresponds do ship[i]

        for (let i = 0; i < this.currentShips.length; i++) {

            if (!this.currentShips[i].docked) { //ship not docked means it is still in the water
                this.removeStyleChildren();

                switch (i + 1) {
                    case 1: {
                        this.style1.innerHTML = '.ship' + (i + 1) + ' {top: 90px;  left: -20px;}';
                        break;
                    }
                    case 2: {
                        this.style2.innerHTML = '.ship' + (i + 1) + ' {top: 180px;  left: -20px;}';
                        break;
                    }
                    case 3: {
                        this.style3.innerHTML = '.ship' + (i + 1) + ' {top: 270px; left: -20px;}';
                        break;
                    }
                    case 4: {
                        this.style4.innerHTML = '.ship' + (i + 1) + ' {top: 360px;  left: -20px;}';
                        break;
                    }
                }
                this.addStyleChildren();

            }

            else if (this.currentShips[i].docked){ //ship is docked means it must be in his dock's position
                this.removeStyleChildren();

                let positionString = '';
                switch (i + 1) {
                    case 1: {
                        positionString = this.dockStringPosition(this.currentShips[i].siteBoard);
                        this.style1.innerHTML = '.ship' + (i + 1) + positionString;
                        break;
                    }
                    case 2: {
                        positionString = this.dockStringPosition(this.currentShips[i].siteBoard);
                        this.style2.innerHTML = '.ship' + (i + 1)  + positionString;
                        break;
                    }
                    case 3: {
                        positionString = this.dockStringPosition(this.currentShips[i].siteBoard);
                        this.style3.innerHTML = '.ship' + (i + 1)  + positionString;
                        break;
                    }
                    case 4: {
                        positionString = this.dockStringPosition(this.currentShips[i].siteBoard);
                        this.style4.innerHTML = '.ship' + (i + 1)  + positionString;
                        break;
                    }

                }
                this.addStyleChildren();

            }
        }

    }


    // TODO: modify this because it does not work. Maybe not displaying the ships anymore and displaying only their empty image counterpart at the docks can do the trick
    dockStringPosition(siteBoard: string): string {
        switch (siteBoard) {
            case 'market': {
                return ' {right:-195px; top:76px; z-index:2;}';
            }
            case 'pyramid': {
                return ' {right:-195px; top:227px; z-index:2;}';
            }
            case 'temple': {
                return ' {right:-195px; top:283px; z-index:2;}';
            }
            case 'burialchamber': {
                return ' {right:-195px; top:345px; z-index:2;}';
            }
            case 'obelisk': {
                return ' {right:-195px; top:529px; z-index:2;}';
            }
        }
    }


    removeStyleChildren(): void {
        document.getElementsByTagName('harbour')[0].removeChild(this.style1);
        document.getElementsByTagName('harbour')[0].removeChild(this.style2);
        document.getElementsByTagName('harbour')[0].removeChild(this.style3);
        document.getElementsByTagName('harbour')[0].removeChild(this.style4);
    }

    addStyleChildren(): void {
        document.getElementsByTagName('harbour')[0].appendChild(this.style1);
        document.getElementsByTagName('harbour')[0].appendChild(this.style2);
        document.getElementsByTagName('harbour')[0].appendChild(this.style3);
        document.getElementsByTagName('harbour')[0].appendChild(this.style4);
    }


    initStyleChildren(): void {
        this.style1.innerHTML = '';
        this.style2.innerHTML = '';
        this.style3.innerHTML = '';
        this.style4.innerHTML = '';
    }

    selectShip(index: number): void {
        this.selectedShip = index;
        document.getElementsByTagName('harbour')[0].removeChild(this.styleSelectedShip);
        this.styleSelectedShip.innerHTML = '.ship-selector' + (index + 1) + ' {border: 3px solid yellow;}';
        document.getElementsByTagName('harbour')[0].appendChild(this.styleSelectedShip);
    }

    selectDock(siteBoardName: string): void {
        if (this.selectedShip != -1) {
            console.log(this.selectedShip);
            let gameId = this.currentGame.id;
            let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1]; //roundId is the last number in the rounds array of the game.
            let shipId = this.currentShips[this.selectedShip].id; //post request requires current ship ID.
            //siteBoardName is already in his correct form.
            let playerToken = this.currentUser.token;

            this.moveService.sailShipToSiteBoard(gameId, roundId, shipId, siteBoardName, playerToken)
                .subscribe(result => {
                    if (result) {
                    } else {
                    }
                });
        }
        else {
            console.log(this.selectedShip);
            // TODO:Show error because a ship has not been selected
        }

    }


    // //dock ship on market
    // //for now market has siteboard.id 1, can change depending on backend-team
    // onMarketDrop(e: any) {
    //     this.shipService.onSiteboardDrop(e, this.currentShips, this.market, 1);
    // }
    //
    // //dock ship on pyramid
    // onPyramidDrop(e: any) {
    //     this.shipService.onSiteboardDrop(e, this.currentShips, this.pyramid, 2);
    // }
    //
    // //dock ship on temple
    // onTempleDrop(e: any) {
    //     this.shipService.onSiteboardDrop(e, this.currentShips, this.temple, 3);
    // }
    //
    // //dock ship on burial chamber
    // onBurialchamberDrop(e: any) {
    //     this.shipService.onSiteboardDrop(e, this.currentShips, this.burialchamber, 4);
    // }
    //
    // //dock ship on obelisk
    // onObeliskDrop(e: any) {
    //     this.shipService.onSiteboardDrop(e, this.currentShips, this.obelisk, 5);
    // }

}
