import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";
import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";

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
    loading = false;
    error = '';
    inWaitingRoom: boolean;

    constructor(private userService: UserService, private gameService: GameService) {
    }

    ngOnInit() {

        // get all users from the server and put them in the user list
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });

        //get all games from the server and put them in the games list
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
        }

        this.inWaitingRoom = false;
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

    createNewGame() {
        this.gameService.createNewGame(this.currentUser)
            .subscribe(result => {
                if (result) {
                } else {
                    this.error = 'Cannot create new game';
                    this.loading = false;
                }
            });
        this.currentGame = this.gameService.getCurrentGame();
        this.inWaitingRoom = true;
    }

    ready() {
        this.gameService.isReady(this.userService.getCurrentUser())
            .subscribe(result => {
                if (result) {
                } else {
                    this.error = 'Cannot go ready ';
                    this.loading = false;
                }
            });
    }
    leave(){
        this.inWaitingRoom=false;
        this.gameService.setDummyGame();
    }

    join(){
    }
}