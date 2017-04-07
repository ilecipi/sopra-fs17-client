import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";
import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";
import {Ship} from "../shared/models/ship";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    private currentGame: Game;
    private currentUser: User;


    //subscriptions to store in order to unsubscribe
    private gameSubscription: any;
    private userSubscription: any;

    constructor(private userService: UserService, private gameService: GameService) {
    }

    ngOnInit() {


        // if game has not been created manually (in the "correct" way), then fill it with the data of Game 1 from postman
        // used only for developing purposes
        // TODO: remove this feature once game is completed
        if (!this.gameService.getTrueGame() && !this.userService.getLoggedStatus()) {

            let dummyUser = new User;
            dummyUser.id = 1;
            dummyUser.name = "Name 1";
            dummyUser.username = "Player 1";
            dummyUser.token = "1";
            dummyUser.status = "IS_PLAYING";
            dummyUser.games = [1];
            dummyUser.moves = [1];
            dummyUser.color = "grey";
            dummyUser.supplySled = 1;
            this.userService.setCurrentUser(dummyUser);

            let opposing1 = new User;
            opposing1.id = 2;
            opposing1.name = "Name 2";
            opposing1.username = "Player 2";
            opposing1.token = "2";
            opposing1.status = "IS_PLAYING";
            opposing1.games = [1];
            opposing1.moves = [2];
            opposing1.color = "brown";
            opposing1.supplySled = 2;

            let opposing2 = new User;
            opposing2.id = 3;
            opposing2.name = "Name 3";
            opposing2.username = "Player 3";
            opposing2.token = "3";
            opposing2.status = "IS_PLAYING";
            opposing2.games = [1];
            opposing2.moves = [3];
            opposing2.color = "black";
            opposing2.supplySled = 3;

            let opposing3 = new User;
            opposing3.id = 4;
            opposing3.name = "Name 4";
            opposing3.username = "Player 4";
            opposing3.token = "4";
            opposing3.status = "IS_PLAYING";
            opposing3.games = [1];
            opposing3.moves = [4];
            opposing3.color = "white";
            opposing3.supplySled = 4;


            let dummyGame = new Game;
            dummyGame.id = 1;
            dummyGame.name = "Game 1";
            dummyGame.owner = "Player 1";
            dummyGame.status = "RUNNING";
            dummyGame.currentPlayer = 1;
            dummyGame.nextPlayer = 2;
            dummyGame.rounds = [0];
            dummyGame.players = [dummyUser, opposing1, opposing2, opposing3];
            this.gameService.setCurrentGame(dummyGame);


            this.currentGame = this.gameService.getCurrentGame();
            this.currentUser = this.userService.getCurrentUser();

            this.pollInfo();


        }

    }

    pollInfo(): void {
        this.gameSubscription = this.gameService.pollGame(this.gameService.getCurrentGame().id)
            .subscribe(game => {
                this.currentGame = game;
            });
        this.userSubscription = this.userService.pollUser(this.userService.getCurrentUser().id)
            .subscribe(user => {
                this.currentUser = user;
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

}
