import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";
import {TempleService} from '../shared/services/temple.service';
import {MoveService} from '../shared/services/move.service';
import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";
import {Ship} from "../shared/models/ship";
import {Stone} from '../shared/models/stone';
import {Temple} from '../shared/models/temple';


@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    private currentGame: Game;
    private currentUser: User;
    private currentTemple: Temple;


    //subscriptions stored in order to unsubscribe later.
    private gameSubscription: any;
    private userSubscription: any;
    private templeSubscription: any;

    constructor(private userService: UserService,
                private gameService: GameService,
                private templeService: TempleService) {
    }

    ngOnInit(): void {


        // if game has not been created manually (in the "correct" way), then fill it with the data of Game 1 from postman
        // used only for developing purposes
        // TODO: remove this feature once game is completed.
        if (!this.gameService.getTrueGame() && !this.userService.getLoggedStatus()) {
            this.gameService.setDummyGame();
            this.userService.setDummyUser();
        }

        this.templeService.setDummyTemple();
        this.currentGame = this.gameService.getCurrentGame();
        this.currentUser = this.userService.getCurrentUser();
        this.currentTemple = this.templeService.getCurrentTemple();

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

    getTempleStones(): Stone[] {
        let stoneArray: Stone[] = [];
        let emptyStone = new Stone();
        for (let i = 0; i < this.currentTemple.stones.length; i++) {
            if (this.currentTemple.stones[i] != null) {
                stoneArray.push(this.currentTemple.stones[i]);
            }
            else {
                stoneArray.push(emptyStone);
            }
        }
        return stoneArray;
    }
}
