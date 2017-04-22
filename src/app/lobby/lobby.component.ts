import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";
import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {NotificationService} from '../shared/services/notification.service';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.css'],
})

export class LobbyComponent implements OnInit {
    games: Game[] = [];
    currentUser: User;
    loggedIn: boolean;
    currentGame: Game;
    index: number;
    inWaitingRoom: boolean;
    createdGame: boolean;
    pressedReady: boolean;

    gamesSubscription: any; //need to store the subscription in order to un-subscribe from it later

    constructor(private userService: UserService,
                private gameService: GameService,
                private router: Router,
                private notificationService: NotificationService) {
    }

    ngOnInit() {

        //Get all games from the server:
        this.gameService.getGames()
            .subscribe(games => {
                this.games = games;
            });


        //Automatically retrieve currentUser information from UserService:
        this.loggedIn = this.userService.getLoggedStatus();
        if (this.loggedIn) {
            this.currentUser = this.userService.getCurrentUser();
        }
        else {
            //dummy data if the user is not logged in.
            //(for example if the page gets refreshed for developing purposes)
            this.currentUser = new User();
            this.currentUser.name = 'Player 1 ';
            this.currentUser.username = 'Player 1';
            this.currentUser.token = "42";
            this.currentUser.id = 42;
        }
        //variables setting on init
        this.inWaitingRoom = false;
        this.createdGame = false;
        this.pressedReady = false;
        this.index = -1;

        //Automatically retrieve users and games list information from server:
        this.pollInfo();

    }

    //calls polling function for games list
    pollInfo() {
        this.gamesSubscription = this.gameService.pollGames()
            .subscribe(games => {
                this.games = games;
            });
    }

    //method called when button is pressed.
    createNewGame() {
        this.gameService.createNewGame(this.currentUser)
            .subscribe(
                (result) => {
                    this.currentGame = result;
                    this.gameService.setCurrentGame(this.currentGame);
                    this.index = this.games.length;

                }
            );
        this.inWaitingRoom = true;
        this.createdGame = true;
    }


    ready() {
        this.gameService.isReady(this.userService.getCurrentUser())
            .subscribe(
                (result) => {
                }
            );
        // this.gameService.updateCurrentGame();
        this.pressedReady = true;
        this.listenForStart();

    }


    join(index: number) {
        let selectedGame = this.games[index]; //selects the game from the games list
        let user = this.userService.getCurrentUser(); //gets currentUser information from userService
        this.gameService.joinGame(selectedGame, user) //join game
            .subscribe(
                (result) => {

                }
            );
        this.inWaitingRoom = true;
        this.gameService.setCurrentGame(selectedGame); //currentGame in gameService is updated
        this.index = index;
    }

    startGame(): void {
        if (this.createdGame) {
            this.gameService.startGame(this.userService.getCurrentUser())
                .subscribe(result => {
                    }
                );
        }
        else {
            //do nothing because not allowed to start the game
        }
    }

    logout() {
        this.notificationService.showNotification('You have been logged out.', 1);
        this.inWaitingRoom = false;
        this.createdGame = false;
        this.gamesSubscription.unsubscribe();
        this.userService.logoutUser();

    }

    listenForStart(time = 300) {
        let subscription = Observable.interval(time).subscribe(x => {
            if (this.index != -1) {
                if (this.games[this.index].status == 'RUNNING') {
                    this.gameService.setCurrentGame(this.games[this.index]);
                    this.gamesSubscription.unsubscribe();
                    subscription.unsubscribe();
                    this.notificationService.showNotification('Your game is starting, good luck!', 1.7);
                    this.router.navigate(['/game']);

                }
            }
        });
    }

}