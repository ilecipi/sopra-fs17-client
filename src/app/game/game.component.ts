import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";
import {TempleService} from '../shared/services/temple.service';
import {MoveService} from '../shared/services/move.service';
import {ShipService} from '../shared/services/ship.service';
import {ObeliskService} from '../shared/services/obelisk.service';
import {BurialChamberService} from '../shared/services/burial-chamber.service';
import {MarketService} from '../shared/services/market.service';
import {PyramidService} from "../shared/services/pyramid.service";
import {BurialChamber} from '../shared/models/burialChamber';


import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";
import {Ship} from "../shared/models/ship";
import {Stone} from '../shared/models/stone';
import {Temple} from '../shared/models/temple';
import {Obelisk} from "../shared/models/obelisk";
import {Pyramid} from '../shared/models/pyramid';
import {Market} from '../shared/models/market';


@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    private currentGame: Game;
    private currentUser: User;
    private currentTemple: Temple;
    private currentShips: Ship[];
    private currentObelisk: Obelisk;
    private currentBurialChamber: BurialChamber;
    private currentPyramid: Pyramid;
    private currentMarket: Market;


    //subscriptions stored in order to unsubscribe later.
    private gameSubscription: any;
    private userSubscription: any;
    private templeSubscription: any;
    private shipsSubscription: any;
    private obeliskSubscription: any;
    private burialChamberSubscription: any;
    private pyramidSubscription: any;
    private marketSubscription: any;

    constructor(private userService: UserService,
                private gameService: GameService,
                private templeService: TempleService,
                private shipService: ShipService,
                private obeliskService: ObeliskService,
                private burialChamberService: BurialChamberService,
                private pyramidService: PyramidService,
                private marketService: MarketService) {
    }

    ngOnInit(): void {



        // if game has not been created manually (in the "correct" way), then fill it with the data of Game 1 from postman
        // used only for developing purposes
        // TODO: remove this feature once game is completed.
        if (!this.gameService.getTrueGame() && !this.userService.getLoggedStatus()) {
            this.gameService.setDummyGame();
            this.userService.setDummyUser();
            console.log('DUMMY GAME AND USER HAVE BEEN SET');
        }
        this.shipService.setDummyShips();
        this.templeService.setDummyTemple();
        this.obeliskService.setDummyObelisk();
        this.marketService.setDummyMarket();
        //burialChamber has no dummy setter because in the html we check if the values exist before displaying them
        //pyramid has also no dummy setter
        //TODO: probably need to remove all other dummy setters, but maintain at least user.id and game.id for developing purposes


        this.currentGame = this.gameService.getCurrentGame();
        this.currentUser = this.userService.getCurrentUser();
        this.currentTemple = this.templeService.getCurrentTemple();
        this.currentShips = this.shipService.getCurrentShips();
        this.currentObelisk = this.obeliskService.getCurrentObelisk();
        this.currentBurialChamber = this.burialChamberService.getCurrentBurialChamber();
        this.currentPyramid = this.pyramidService.getCurrentPyramid();
        this.currentMarket = this.marketService.getCurrentMarket();

        this.pollInfo();
    }

    pollInfo(): void {
        this.gameSubscription = this.gameService.pollGame(this.currentGame.id)
            .subscribe(game => {
                this.currentGame = game;
            });
        this.userSubscription = this.userService.pollUser(this.currentUser.token)
            .subscribe(user => {
                this.currentUser = user;
            });
        this.templeSubscription = this.templeService.pollTemple(this.currentGame.id)
            .subscribe(temple => {
                this.currentTemple = temple;
            });
        this.shipsSubscription = this.shipService.pollShips(this.currentGame.id, this.currentGame.rounds[this.currentGame.rounds.length - 1])
            .subscribe(ships => {
                this.setShips(ships);
            });
        this.obeliskSubscription = this.obeliskService.pollObelisk(this.currentGame.id)
            .subscribe(obelisk => {
                this.currentObelisk = obelisk;
            });
        this.burialChamberSubscription = this.burialChamberService.pollBurialChamber(this.currentGame.id)
            .subscribe(burialChamber => {
                this.currentBurialChamber = burialChamber;
            });
        this.pyramidSubscription = this.pyramidService.pollPyramid(this.currentGame.id)
            .subscribe(pyramid => {
                this.currentPyramid = pyramid;
            });
        this.marketSubscription = this.marketService.pollMarket(this.currentGame.id)
            .subscribe(market => {
                this.currentMarket = market;
            });
    }

    setShips(ships: Ship[]): void {
        for (let i = 0; i < ships.length; i++) {
            for (let j = 0; j < ships[i].stones.length; j++) {
                if (ships[i].stones[j] == null) {
                    ships[i].stones[j] = new Stone();
                }
            }
        }
        this.currentShips = ships;
    }

    getOpposingPlayers(): User[] {
        let opposingPlayers: User[] = [];
        for (let i = 0; i < this.currentGame.players.length; i++) {
            if (this.userService.getCurrentUser().id != this.currentGame.players[i].id) {
                opposingPlayers.push(this.currentGame.players[i]);
            }
        }
        return opposingPlayers;
    }

    getUser(): User {
        for (let i = 0; i < this.currentGame.players.length; i++) {
            if (this.currentUser.id == this.currentGame.players[i].id) {
                return this.currentGame.players[i];
            }
        }
    }

    getHowManyOpponents(): number {
        return this.currentGame.players.length - 1;
    }

}
