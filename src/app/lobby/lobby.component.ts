import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";
import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";
import {Observable} from 'rxjs/Rx';


@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.css'],
})

export class LobbyComponent implements OnInit {
    users: User[] = [];
    games: Game[] = [];
    currentUser: User;
    loggedIn: boolean;
    currentGame: Game;
    inWaitingRoom: boolean;
    index: number;
    waitingRoom: Game;


    constructor(private userService: UserService, private gameService: GameService) {
    }

    ngOnInit() {

        // Get all users from the server and put them in the user list
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });

        //Get all games from the server and put them in the games list
        this.gameService.getGames()
            .subscribe(games => {
                this.games = games;
            });

        //Automatically retrieve users and games list information from server:
        this.pollInfo(this.gameService, this.userService);

        //Automatically retrieve currentUser information from UserService:
        this.loggedIn = this.userService.getLoggedStatus();
        if (this.loggedIn) {
            this.currentUser = this.userService.getCurrentUser();
        }
        else {
            //dummy data if the user is not logged in.
            //(for example if the page gets refreshed for developing purposes)
            this.currentUser = new User();
            this.currentUser.name = 'Dummy';
            this.currentUser.username = 'DonDon';
            this.currentUser.token = "42";
            this.currentUser.id = 42;
        }
        //Cannot start a game in
        this.inWaitingRoom = false;
        this.index = -1;

        Observable.interval(1000).subscribe(x => {
            this.updateWaitingRoom();
        });
    }

    //calls polling function for games and users
    pollInfo(gameService: GameService, userService: UserService) {
        gameService.pollGames()
            .subscribe(games => {
                this.games = games;
            });
        userService.pollUsers()
            .subscribe(users => {
                this.users = users;
            });
    }

    //method called when button is pressed.
    createNewGame() {
        if (this.inWaitingRoom) {
            //not allowed to create a new game while in waiting room, so do nothing.
        }
        else {
            this.gameService.createNewGame(this.currentUser)
                .subscribe(result => {
                    this.currentGame = result;
                    this.gameService.setCurrentGame(this.currentGame);
                });
            this.inWaitingRoom = true;
            this.index = this.games.length;
        }
    }


    ready() {
        this.gameService.isReady(this.userService.getCurrentUser())
            .subscribe(result => {
                if (result) {
                    console.log("User gone ready");
                } else {
                    console.log("User not gone ready");
                }
            });
        this.gameService.updateCurrentGame();
    }

    leave() {
        this.inWaitingRoom = false;
        this.gameService.setDummyGame();
        this.index = -1;
        //TODO: Need to inform the server about player leaving a waiting room
    }

    join(index: number) {
        let selectedGame = this.games[index]; //selects the game from the games list
        let user = this.userService.getCurrentUser(); //gets currentUser information from userService
        this.gameService.joinGame(selectedGame, user) //join game
            .subscribe(result => {
                if (result) {
                } else {

                }
            });
        this.inWaitingRoom = true;
        this.gameService.setCurrentGame(selectedGame); //currentGame in gameService is updated
        this.index = index;


    }

    logout() {
        this.userService.logoutUser();
    }

    updateWaitingRoom(): void {
        if (this.index < 0) {
            //do nothing because no game has been selected
        }
        else {
            this.waitingRoom = this.games[this.index];
            console.log(this.waitingRoom);
        }
    }
}