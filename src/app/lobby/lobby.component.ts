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
    createdGame: boolean;


    constructor(private userService: UserService, private gameService: GameService) {
    }

    ngOnInit() {

        //Get all games from the server:
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
        this.createdGame = false;
        this.index = -1;
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


            this.gameService.createNewGame(this.currentUser)
                .subscribe(result => {
                    this.currentGame = result;
                    this.gameService.setCurrentGame(this.currentGame);
                });
            this.index = this.games.length;
            this.inWaitingRoom = true;
            this.createdGame=true;
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

}