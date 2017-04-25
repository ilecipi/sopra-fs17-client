import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ShipService} from "../../shared/services/ship.service";
import {GameService} from "../../shared/services/game.service";

import {Game} from "../../shared/models/game";
import {Ship} from "../../shared/models/ship";
import {Stone} from "../../shared/models/stone";
import {MoveService} from "../../shared/services/move.service";
import {User} from "../../shared/models/user";
import {Observable} from "rxjs/Rx";
import {NotificationService} from "../../shared/services/notification.service";

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
    private styleShip1Position = document.createElement('style');
    private styleShip2Position = document.createElement('style');
    private styleShip3Position = document.createElement('style');
    private styleShip4Position = document.createElement('style');

    //style required to highlight current selected ship.
    private styleSelectedShip = document.createElement('style');

    //style required to position empty ship images at each dock;
    private styleEmptyShipMarket = document.createElement('style');
    private styleEmptyShipPyramid = document.createElement('style');
    private styleEmptyShipTemple = document.createElement('style');
    private styleEmptyShipBurialChamber = document.createElement('style');
    private styleEmptyShipObelisk = document.createElement('style');

    constructor(private shipService: ShipService,
                private gameService: GameService,
                private moveService: MoveService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        //styles initialization for selection feature
        this.styleSelectedShip.innerHTML = '';
        document.getElementsByTagName('harbour')[0].appendChild(this.styleSelectedShip);

        //styles initialization for docked and undocked ships position
        this.initStyleShip();
        this.initStyleEmptyShip();

        //adding styles for docked ships
        this.addStyleShip();

        //adding styles for undocked ships
        this.addStyleEmptyShip();

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
            .subscribe(
                (result) => {
                    // do nothing because successful
                },
                (errorData) => {
                    if (errorData.status == 403){
                        this.notificationService.showNotification(errorData._body,3)
                    }
                        // this.notificationService.showNotification(errorData._body, 4);
                }
            );
    }

    // // Error callback
    // var error = errorData.json();
    // var messages = error.messages;
    // messages.forEach((message) => {
    // this.companyForm.controls[message.property].setErrors({
    //  remote: message.message });

    selectDock(siteBoardName: string): void {
        if (this.selectedShip != -1) {
            console.log(this.selectedShip);
            let gameId = this.currentGame.id;
            let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1]; //roundId is the last number in the rounds array of the game.
            let shipId = this.currentShips[this.selectedShip].id; //post request requires current ship ID.
            //siteBoardName is already in his correct form.
            let playerToken = this.currentUser.token;

            this.moveService.sailShipToSiteBoard(gameId, roundId, shipId, siteBoardName, playerToken)
                .subscribe(
                    (result) => {
                        // do nothing because successful
                    },
                    (errorData) => {

                    }
                );
        }
        else {
            this.notificationService.showNotification('Before sailing a ship you need to select one.', 3);
        }

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

    getEmptyShipSrc(dockName: string): string {
        let shipSrc = '';
        for (let i = 0; i <= this.currentShips.length; i++) {
            if (this.currentShips[i] != undefined && this.currentShips[i].siteBoard == dockName) {
                shipSrc = this.getShipSrc(i);
            }
        }
        return shipSrc;
    }

    getEmptyShipStyle(dockName: string): string {
        let shipStyle = 'position: relative; ';
        for (let i = 0; i <= this.currentShips.length; i++) {
            if (this.currentShips[i] != undefined && this.currentShips[i].siteBoard == dockName) {
                switch (this.currentShips[i].stones.length) {
                    case 1: {
                        shipStyle += 'right:100px;';
                        break;
                    }
                    case 2: {
                        shipStyle += 'right:100px;';
                        break;
                    }
                    case 3: {
                        shipStyle += 'right:100px;';
                        break;
                    }
                    case 4: {
                        shipStyle += 'right:100px;';
                        break;
                    }
                }
            }
        }
        return shipStyle;
    }

    pollShipPositions(): void {
        this.styleSubscription = Observable.interval(100).subscribe(x => {
            this.setShipPositions();
            this.setEmptyShipsPositions();
        })

    }

    setShipPositions(): void {

        //style[i] corresponds do ship[i]

        for (let i = 0; i < this.currentShips.length; i++) {

            if (!this.currentShips[i].docked) { //ship not docked means it is still in the water
                this.removeStyleShip(); //removing styles before modifications

                switch (i + 1) {
                    case 1: {
                        this.styleShip1Position.innerHTML = '.ship' + (i + 1) + ' {top: 90px;  left: -20px;}';
                        break;
                    }
                    case 2: {
                        this.styleShip2Position.innerHTML = '.ship' + (i + 1) + ' {top: 180px;  left: -20px;}';
                        break;
                    }
                    case 3: {
                        this.styleShip3Position.innerHTML = '.ship' + (i + 1) + ' {top: 270px; left: -20px;}';
                        break;
                    }
                    case 4: {
                        this.styleShip4Position.innerHTML = '.ship' + (i + 1) + ' {top: 360px;  left: -20px;}';
                        break;
                    }
                }
                this.addStyleShip(); //adding styles again after modifications
            }

            else if (this.currentShips[i].docked) { //ship is docked means it must be hidden and an empty counterpart must be displayed at that ship's dock
                this.removeStyleShip(); //removing styles before modifications


                switch (i + 1) {
                    case 1: {
                        this.styleShip1Position.innerHTML = '.ship' + (i + 1) + ' {display: none}';
                        break;
                    }
                    case 2: {
                        this.styleShip2Position.innerHTML = '.ship' + (i + 1) + ' {display: none}';
                        break;
                    }
                    case 3: {
                        this.styleShip3Position.innerHTML = '.ship' + (i + 1) + ' {display: none}';
                        break;
                    }
                    case 4: {
                        this.styleShip4Position.innerHTML = '.ship' + (i + 1) + ' {display: none}';
                        break;
                    }
                }
                this.addStyleShip(); //adding styles again after modifications
            }
        }
    }

    setEmptyShipsPositions(): void {
        this.removeStyleEmptyShip();
        this.initStyleEmptyShip(); //reset all styles the default value because if the ship is docked her style will get updated again

        for (let i = 0; i <= this.currentShips.length; i++) {
            if (this.currentShips[i] != undefined && this.currentShips[i].docked == true) {
                switch (this.currentShips[i].siteBoard) {
                    case 'market': {
                        this.styleEmptyShipMarket.innerHTML = '.empty-image-market { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}';
                        break;
                    }
                    case 'pyramid': {
                        this.styleEmptyShipPyramid.innerHTML = '.empty-image-pyramid { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}';
                        break;
                    }
                    case 'temple': {
                        this.styleEmptyShipTemple.innerHTML = '.empty-image-temple { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}';
                        break;
                    }
                    case 'burialchamber': {
                        this.styleEmptyShipBurialChamber.innerHTML = '.empty-image-burialchamber { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}';
                        break;
                    }
                    case 'obelisk': {
                        this.styleEmptyShipObelisk.innerHTML = '.empty-image-obelisk { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}';
                        break;
                    }

                }
            }
        }

        this.addStyleEmptyShip();
    }

    getEmptyPosition(i: number): string {
        switch (i) {
            case 1: {
                return '60';
            }
            case 2: {
                return '95';
            }
            case 3: {
                return '128';
            }
            case 4: {
                return '168';
            }
        }
    }

    removeStyleShip(): void {
        document.getElementsByTagName('harbour')[0].removeChild(this.styleShip1Position);
        document.getElementsByTagName('harbour')[0].removeChild(this.styleShip2Position);
        document.getElementsByTagName('harbour')[0].removeChild(this.styleShip3Position);
        document.getElementsByTagName('harbour')[0].removeChild(this.styleShip4Position);


    }

    removeStyleEmptyShip(): void {
        document.getElementsByTagName('harbour')[0].removeChild(this.styleEmptyShipMarket);
        document.getElementsByTagName('harbour')[0].removeChild(this.styleEmptyShipPyramid);
        document.getElementsByTagName('harbour')[0].removeChild(this.styleEmptyShipTemple);
        document.getElementsByTagName('harbour')[0].removeChild(this.styleEmptyShipBurialChamber);
        document.getElementsByTagName('harbour')[0].removeChild(this.styleEmptyShipObelisk);
    }

    addStyleShip(): void {
        document.getElementsByTagName('harbour')[0].appendChild(this.styleShip1Position);
        document.getElementsByTagName('harbour')[0].appendChild(this.styleShip2Position);
        document.getElementsByTagName('harbour')[0].appendChild(this.styleShip3Position);
        document.getElementsByTagName('harbour')[0].appendChild(this.styleShip4Position);

    }

    addStyleEmptyShip(): void {
        document.getElementsByTagName('harbour')[0].appendChild(this.styleEmptyShipMarket);
        document.getElementsByTagName('harbour')[0].appendChild(this.styleEmptyShipPyramid);
        document.getElementsByTagName('harbour')[0].appendChild(this.styleEmptyShipTemple);
        document.getElementsByTagName('harbour')[0].appendChild(this.styleEmptyShipBurialChamber);
        document.getElementsByTagName('harbour')[0].appendChild(this.styleEmptyShipObelisk);
    }


    initStyleShip(): void {
        this.styleShip1Position.innerHTML = '';
        this.styleShip2Position.innerHTML = '';
        this.styleShip3Position.innerHTML = '';
        this.styleShip4Position.innerHTML = '';
    }

    initStyleEmptyShip(): void {
        //hides a little grey empty square that contains no image
        this.styleEmptyShipMarket.innerHTML = '.empty-image-market {display: none}';
        this.styleEmptyShipPyramid.innerHTML = '.empty-image-pyramid {display: none}';
        this.styleEmptyShipTemple.innerHTML = '.empty-image-temple {display: none}';
        this.styleEmptyShipBurialChamber.innerHTML = '.empty-image-burialchamber {display: none}';
        this.styleEmptyShipObelisk.innerHTML = '.empty-image-obelisk {display: none}';
    }

    selectShip(index: number): void {
        console.log(index);
        this.selectedShip = index;
        document.getElementsByTagName('harbour')[0].removeChild(this.styleSelectedShip);
        this.styleSelectedShip.innerHTML = '.ship-selector' + (index + 1) + ' {border: 3px solid yellow;}';
        document.getElementsByTagName('harbour')[0].appendChild(this.styleSelectedShip);
    }

    fastForward() {
        let gameId = this.currentGame.id;
        this.moveService.fastForward(gameId)
            .subscribe(
                (result) => {
                    this.notificationService.showNotification('Game is fast-forwarding...', 2);
                },
            );
    }


}
