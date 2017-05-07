import {Component, Input, OnInit} from "@angular/core";

import {Game} from "../../shared/models/game";
import {Ship} from "../../shared/models/ship";
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

    private waveCounter: number; // Used to let the ship sway around
    public showWave: boolean; // Used to show wave


    private setShipSubscription: any;
    private setEmptyShipSubscription: any;
    private setLastStoneSubscription: any;

    // Styles required to move each ship in the correct place.
    private styleShip1Position = document.createElement('style');
    private styleShip2Position = document.createElement('style');
    private styleShip3Position = document.createElement('style');
    private styleShip4Position = document.createElement('style');

    // Style required to highlight current selected ship.
    private styleSelectedShip = document.createElement('style');
    private showLast: boolean;
    private cachedLast: string;
    private hideLast: boolean;
    private stoneTime = 1500; // Show notification of last stone for 1.5 secs

    // Style required to highlight last palced stone.
    private styleLastStone = document.createElement('style');



    // Style required to position empty ship images at each dock;
    private styleEmptyShipMarket = document.createElement('style');
    private styleEmptyShipPyramid = document.createElement('style');
    private styleEmptyShipTemple = document.createElement('style');
    private styleEmptyShipBurialChamber = document.createElement('style');
    private styleEmptyShipObelisk = document.createElement('style');

    constructor(private moveService: MoveService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        // Styles initialization for selection feature
        this.styleSelectedShip.innerHTML = '';
        document.getElementsByTagName('harbour')[0].appendChild(this.styleSelectedShip);

        // Style initialization for last placed stone:
        this.styleLastStone.innerHTML = '';
        document.getElementsByTagName('harbour')[0].appendChild(this.styleLastStone);
        this.showLast = true;
        this.hideLast = false;
        this.cachedLast = 'none-none';

        // Styles initialization for docked and undocked ships position
        this.initStyleShip();
        this.initStyleEmptyShip();

        // Adding styles for docked ships
        this.addStyleShip();

        // Adding styles for undocked ships
        this.addStyleEmptyShip();

        // Initializations for the sway of the ships
        this.waveCounter = 0; // initialize waveCounter to 0, it will go up to 2*PI and reset itself later
        this.showWave = false;

        // Polling ship positions
        this.pollShipPositions();


    }


    addStone(shipIndex: number, stoneIndex: number): void {

        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1]; // RoundId is the last number in the rounds array of the game.
        let playerToken = this.currentUser.token;
        let shipId = this.currentShips[shipIndex].id; // Post request is going to require current ship ID.
        // Stone index is going to start from zero also for the backend;

        this.moveService.addStone(gameId, roundId, shipId, playerToken, stoneIndex)
            .subscribe(
                (result) => {
                    // do nothing because successful
                },
                (errorData) => {
                    if (errorData.status === 403) {
                        let cuts = errorData._body.split('"');
                        this.notificationService.show(cuts[15]);
                    }
                }
            );
    }

    selectDock(siteBoardName: string): void {
        if (this.selectedShip !== -1) {
            let gameId = this.currentGame.id;
            let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1]; // RoundId is the last number in the rounds array of the game.
            let shipId = this.currentShips[this.selectedShip].id; // Post request requires current ship ID.
            // SiteBoardName is already in his correct form.
            let playerToken = this.currentUser.token;

            this.moveService.sailShipToSiteBoard(gameId, roundId, shipId, siteBoardName, playerToken)
                .subscribe(
                    (result) => {
                        this.unselectShip();
                    },
                    (errorData) => {
                        if (errorData.status == 403) {
                            let cuts = errorData._body.split('"');
                            // Let notification= secondCut[0];
                            this.notificationService.show(cuts[15]);
                        }

                    }
                );
        }
        else {
            this.notificationService.show('Before sailing a ship you need to select one.');
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
            if (this.currentShips[i] !== undefined && this.currentShips[i].siteBoard === dockName) {
                shipSrc = this.getShipSrc(i);
            }
        }
        return shipSrc;
    }

    getEmptyShipStyle(dockName: string): string {
        let shipStyle = 'position: relative; ';
        for (let i = 0; i <= this.currentShips.length; i++) {
            if (this.currentShips[i] !== undefined && this.currentShips[i].siteBoard === dockName) {
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

    swapWave(): void {
        this.showWave = !this.showWave;
        this.setShipSubscription.unsubscribe();
        this.setEmptyShipSubscription.unsubscribe();
        this.setLastStoneSubscription.unsubscribe();
        this.pollShipPositions();
    }

    pollShipPositions(): void {
        let timeShip: number;
        if (this.showWave) {
            timeShip = 32; // Every 32 milliseconds means roughly at 30 fps refresh rate
        }
        else {
            timeShip = 200; // If ships are not moving, then there is no need to refresh very fast
        }
        this.setShipSubscription = Observable.interval(timeShip).subscribe(x => {
            this.setShipPositions();
        });
        this.setEmptyShipSubscription = Observable.interval(200).subscribe(x => {
            this.setEmptyShipsPositions();
        });
        this.setLastStoneSubscription = Observable.interval(200).subscribe(x => {
            this.setLastStonePlaced();
        });

    }

    setShipPositions(): void {

        // Style[i] corresponds do ship[i]

        for (let i = 0; i < this.currentShips.length; i++) {

            if (!this.currentShips[i].docked) { // Ship not docked means it is still in the water
                this.removeStyleShip(); // Removing styles before modifications

                let step = Math.PI * 2 / 1000; // Step is going to be a fraction of the whole circle in radians
                let omegaHorizontal = 2; // Angular velocity for the ship positions formula (better use whole numbers to avoid stuttering)
                let omegaVertical = 4; // Angular velocity for the ship positions formula (better use whole numbers to avoid stuttering)
                let amplitude = 5; // Max positive and negative offset in pixels of the ship positions
                let omegaScale = 2  ;
                let amplitudeScale=0.1;

                if (!this.showWave) {
                    amplitude = 0;
                    amplitudeScale=0;
                }
                switch (i + 1) {
                    case 1: {
                        this.styleShip1Position.innerHTML = '.ship' + (i + 1) + ' {top: ' + (80 + amplitude * Math.sin(this.waveCounter * omegaVertical + 0.8)) + 'px;' +
                            '  left:' + ( -20 + amplitude * Math.sin(this.waveCounter * omegaHorizontal + 0.8)) + 'px;' +
                            ' transform: scale(' + (1.0 + amplitudeScale * Math.sin(this.waveCounter * omegaScale + 0.8) )+ ');}';
                        break;
                    }
                    case 2: {
                        this.styleShip2Position.innerHTML = '.ship' + (i + 1) + ' {top: ' + (220 + amplitude * Math.sin(this.waveCounter * omegaVertical + 2.4)) + 'px;' +
                            '  left:' + ( -20 + amplitude * Math.sin(this.waveCounter * omegaHorizontal + 2.4)) + 'px;'+
                            ' transform: scale(' + (1.0 + amplitudeScale * Math.sin(this.waveCounter * omegaScale + 2.4)  )+ ');}';
                        break;
                    }
                    case 3: {
                        this.styleShip3Position.innerHTML = '.ship' + (i + 1) + ' {top: ' + (360 + amplitude * Math.sin(this.waveCounter * omegaVertical + 1.6)) + 'px;' +
                            '  left:' + ( -20 + amplitude * Math.sin(this.waveCounter * omegaHorizontal + 1.6)) + 'px;'+
                            ' transform: scale(' + (1.0 + amplitudeScale * Math.sin(this.waveCounter * omegaScale + 1.6) )+ ');}';
                        break;
                    }
                    case 4: {
                        this.styleShip4Position.innerHTML = '.ship' + (i + 1) + ' {top: ' + (500 + amplitude * Math.sin(this.waveCounter * omegaVertical + 3.2)) + 'px;' +
                            '  left:' + ( -20 + amplitude * Math.sin(this.waveCounter * omegaHorizontal + 3.2)) + 'px;'+
                            ' transform: scale(' + (1.0 + amplitudeScale * Math.sin(this.waveCounter * omegaScale + 3.2)  )+ ');}';
                        break;
                    }
                }
                this.addStyleShip(); // Adding styles again after modifications
                this.waveCounter += step;

                if (this.waveCounter >= Math.PI * 2) {
                    this.waveCounter = 0;
                }
            }

            else if (this.currentShips[i].docked) { // Ship is docked means it must be hidden and an empty counterpart must be displayed at that ship's dock
                this.removeStyleShip(); // Removing styles before modifications


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
                this.addStyleShip(); // Adding styles again after modifications
            }
        }
    }

    setEmptyShipsPositions(): void {
        this.removeStyleEmptyShip();
        this.initStyleEmptyShip(); // Reset all styles the default value because if the ship is docked her style will get updated again

        for (let i = 0; i <= this.currentShips.length; i++) {
            if (this.currentShips[i] !== undefined && this.currentShips[i].docked === true) {
                switch (this.currentShips[i].siteBoard) {
                    case 'market': {
                        this.styleEmptyShipMarket.innerHTML = '.empty-image-market { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}' +
                        '.market-dock {background-color: grey;}';
                        break;
                    }
                    case 'pyramid': {
                        this.styleEmptyShipPyramid.innerHTML = '.empty-image-pyramid { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}' +
                            '.pyramid-dock {background-color: grey;}';
                        break;
                    }
                    case 'temple': {
                        this.styleEmptyShipTemple.innerHTML = '.empty-image-temple { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}' +
                            '.temple-dock {background-color: grey;}';
                        break;
                    }
                    case 'burialchamber': {
                        this.styleEmptyShipBurialChamber.innerHTML = '.empty-image-burialchamber { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}' +
                            '.burial-chamber-dock {background-color: grey;}';
                        break;
                    }
                    case 'obelisk': {
                        this.styleEmptyShipObelisk.innerHTML = '.empty-image-obelisk { right: ' +
                            this.getEmptyPosition(this.currentShips[i].stones.length) + 'px;}' +
                            '.obelisk-dock {background-color: grey;}';
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
        // Hides a little grey empty square that contains no image
        this.styleEmptyShipMarket.innerHTML = '.empty-image-market {display: none}';
        this.styleEmptyShipPyramid.innerHTML = '.empty-image-pyramid {display: none}';
        this.styleEmptyShipTemple.innerHTML = '.empty-image-temple {display: none}';
        this.styleEmptyShipBurialChamber.innerHTML = '.empty-image-burialchamber {display: none}';
        this.styleEmptyShipObelisk.innerHTML = '.empty-image-obelisk {display: none}';
    }

    selectShip(index: number): void {
        this.selectedShip = index;
        document.getElementsByTagName('harbour')[0].removeChild(this.styleSelectedShip);
        this.styleSelectedShip.innerHTML = '.ship-selector' + (index + 1) + ' {border: 3px solid yellow;}';
        document.getElementsByTagName('harbour')[0].appendChild(this.styleSelectedShip);
    }

    unselectShip():void{
        this.selectedShip = -1;
        document.getElementsByTagName('harbour')[0].removeChild(this.styleSelectedShip);
        this.styleSelectedShip.innerHTML = '';
        document.getElementsByTagName('harbour')[0].appendChild(this.styleSelectedShip);
    }

    fastForward() {
        let gameId = this.currentGame.id;
        this.moveService.fastForward(gameId)
            .subscribe(
                (result) => {
                    this.notificationService.show('Game is fast-forwarding...');
                },
            );
    }

    setLastStonePlaced(): void {
        let last = this.currentGame.lastAddedStone;
        if (last === 'none-none' || last === undefined || last === null || this.hideLast) {
            document.getElementsByTagName('harbour')[0].removeChild(this.styleLastStone);
            this.styleLastStone.innerHTML = '';
            document.getElementsByTagName('harbour')[0].appendChild(this.styleLastStone);
            this.hideLast = false;
        }
        else { // In this case the variable is a valid input
            if (this.cachedLast !== last && this.showLast) {
                this.cachedLast = last;
                document.getElementsByTagName('harbour')[0].removeChild(this.styleLastStone);
                this.styleLastStone.innerHTML = '.stone-' + last + '{box-shadow: 0 0 3px 7px var(--turn);}';
                document.getElementsByTagName('harbour')[0].appendChild(this.styleLastStone);

                this.showLast = false;
                this.hideLast = false;
                setTimeout(() => this.showLast = this.hideLast = true, this.stoneTime);
            }

        }
    }


}
