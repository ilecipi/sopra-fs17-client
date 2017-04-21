import {Component, OnInit} from '@angular/core';

import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";

import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";

@Component({
    selector: 'end-game',
    templateUrl: './end-game.component.html',
    styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

    private currentGame: Game;
    private currentUser: User;


    //subscriptions stored in order to unsubscribe later.
    private gameSubscription: any;
    private userSubscription: any;


    constructor(private userService: UserService,
                private gameService: GameService) {
    }

    ngOnInit() {
        // if game has not been created manually (in the "correct" way), then fill it with the data of Game 1 from postman
        // used only for developing purposes
        // TODO: remove this feature once game is completed.
        if (!this.gameService.getTrueGame() && !this.userService.getLoggedStatus()) {
            this.gameService.setDummyGame();
            this.userService.setDummyUser();
            console.log('DUMMY GAME AND USER HAVE BEEN SET');
        }
        //TODO: probably need to remove all other dummy setters, but maintain at least user.id and game.id for developing purposes


        this.currentGame = this.gameService.getCurrentGame();
        this.currentUser = this.userService.getCurrentUser();

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
    }


    getRankedPlayers(): User[]{
        let rankedPlayers =  this.currentGame.players;
        let finalPoints: number[] = [];

        for (let i = 0; i < this.currentGame.players.length; i++) {
            finalPoints[i] = this.getPoints(i);
        }

        for (let i = 0; i < rankedPlayers.length; i++) {
            if (finalPoints[i] < finalPoints[i+1]) {
                let tmp = rankedPlayers[i+1];
                let tmpPoints = finalPoints[i+1];
                rankedPlayers[i+1] = rankedPlayers[i];
                finalPoints[i+1] = finalPoints[i];
                rankedPlayers[i] = tmp;
                finalPoints[i] = tmpPoints;
                i = i-2;
            }
        }
        return rankedPlayers;
    }


    getPoints(i: number): number {
        let playerColor = this.currentGame.players[i].color;
        if (playerColor == undefined) return 0;
        if (playerColor === 'brown') {
            return this.currentGame.points.brown;
        }
        else if (playerColor === 'grey') {
            return this.currentGame.points.grey;
        }
        else if (playerColor === 'black') {
            return this.currentGame.points.black;
        }
        else if (playerColor === 'white') {
            return this.currentGame.points.white;
        }
        else {
            return -1; //the color wasn't found and must show invalid number
        }
    }


    logout() {
        this.userService.logoutUser();
        this.gameSubscription.unsubscribe();
    }
}
