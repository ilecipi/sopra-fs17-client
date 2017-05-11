import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../shared/services/user.service';
import {GameService} from '../shared/services/game.service';

import {User} from '../shared/models/user';
import {Game} from '../shared/models/game';

@Component({
    selector: 'end-game',
    templateUrl: './end-game.component.html',
    styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

    public currentGame: Game;
    public currentUser: User;


    // Subscriptions stored in order to unsubscribe later.
    private gameSubscription: any;
    private userSubscription: any;


    constructor(private userService: UserService,
                private gameService: GameService,
                private router: Router) {
    }

    ngOnInit(): void {

        if(!localStorage.getItem('userToken') || !localStorage.getItem('userUsername') || !localStorage.getItem('gameId') || !localStorage.getItem('userId')){
            this.router.navigate(['/login']); // Navigate to login because not allowed to stay in game without gameId or userToken.
        }

        if(localStorage.getItem('userToken') && localStorage.getItem('userUsername') && localStorage.getItem('userId')){
            let oldToken = localStorage.getItem('userToken');
            let oldUsername = localStorage.getItem('userUsername');
            let oldId = +localStorage.getItem('userId');
            this.userService.setOldUser(oldToken, oldUsername, oldId);
            this.currentUser = this.userService.getCurrentUser();
            console.log(this.currentUser)
        }

        if(localStorage.getItem('gameId')){
            let oldId = +localStorage.getItem('gameId');
            this.gameService.setOldGame(oldId);
            this.currentGame = this.gameService.getCurrentGame();
            console.log(this.currentGame);

        }


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


    getRankedPlayers(): User[] {
        let rankedPlayers =  this.currentGame.players;
        let finalPoints: number[] = [];

        for (let i = 0; i < this.currentGame.players.length; i++) {
            finalPoints[i] = this.getPoints(i);
        }

        for (let i = 0; i < rankedPlayers.length; i++) {
            if (finalPoints[i] < finalPoints[i + 1]) {
                let tmp = rankedPlayers[i + 1];
                let tmpPoints = finalPoints[i + 1];
                rankedPlayers[i + 1] = rankedPlayers[i];
                finalPoints[i + 1] = finalPoints[i];
                rankedPlayers[i] = tmp;
                finalPoints[i] = tmpPoints;
                i = i - 2;
            }
        }
        return rankedPlayers;
    }


    getPoints(i: number): number {
        let playerColor = this.currentGame.players[i].color;
        if (playerColor === undefined) {
            return 0;
        }
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
            return -1; // The color wasn't found and must show invalid number
        }
    }


    newGame(): void{
        this.userSubscription.unsubscribe();
        this.gameSubscription.unsubscribe();
        localStorage.removeItem('createdGame');
        localStorage.removeItem('gameId');
        this.router.navigate(['/lobby']);
    }

    quit(): void {
        this.userService.logoutUser();
        this.userSubscription.unsubscribe();
        this.gameSubscription.unsubscribe();
        localStorage.clear();
        this.router.navigate(['/login']);
    }


}
