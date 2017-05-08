import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {GameService} from '../shared/services/game.service';
import {User} from '../shared/models/user';
import {Game} from '../shared/models/game';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NotificationService} from '../shared/services/notification.service';
import {} from '../../assets/pdf'

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
    gameName: string;

    gamesSubscription: any; // Need to store the subscriptions in order to un-subscribe from them later
    userSubscription: any;

    constructor(private userService: UserService,
                private gameService: GameService,
                private router: Router,
                private notificationService: NotificationService) {
    }

    ngOnInit() {

        if (localStorage.getItem('userToken') === null) {
            this.router.navigate(['/login']); // Navigate to login because not allowed to refresh page or to enter the page name in the url
            localStorage.clear();
        }
        else{
            // Variables setting on init
            this.inWaitingRoom = false;
            this.createdGame = false;
            this.pressedReady = false;
            this.index = -1;


            // The user has already an account;
            let oldUser = new User();
            oldUser.token = localStorage.getItem('userToken');
                this.userService.setCurrentUser(oldUser);
            this.currentUser = oldUser;

            this.gameName = '';


            // Checks if the user already joined or has created a game or not
            if (localStorage.getItem('gameId') !== null){
                let oldGame = new Game;
                oldGame.id =+ localStorage.getItem('gameId');
                this.gameService.setCurrentGame(oldGame);
            }

            // Checks if the user did create a game or not:
            if(localStorage.getItem('createdGame')!== null){
                this.createdGame = true;
                this.inWaitingRoom = true;
            }

            if(localStorage.getItem('gameIndex') !== null){
                this.inWaitingRoom = true;
                this.index = +localStorage.getItem('gameIndex');
            }


            // Get all games from the server:
            this.gameService.getGames()
                .subscribe(games => {
                    this.games = games;
                });

            // Automatically retrieve users and games list information from server:
            this.pollInfo();
            this.listenForStart();
        }


    }

    // Calls polling function for games list
    pollInfo() {
        this.gamesSubscription = this.gameService.pollGames()
            .subscribe(games => {
                this.games = games;
            });
        this.userSubscription = this.userService.pollUser(this.currentUser.token)
            .subscribe((user) => {
                this.currentUser = user;
                if (this.currentUser.status === 'IN_A_LOBBY') {
                    this.inWaitingRoom = true;
                }
                if (this.currentUser.status === 'IS_READY') {
                    this.pressedReady = true;
                }
                console.log(this.currentUser.status);
                console.log(this.inWaitingRoom);
                console.log(this.createdGame);
                console.log(this.index);

            });
    }

    // Method called when button is pressed.
    createNewGame(): void {
        if (this.gameName === undefined || this.gameName === ''){
            this.notificationService.show('Please insert a valid game name');
        }
        else {
            this.gameService.createNewGame(this.currentUser, this.gameName)
                .subscribe(
                    (result) => {
                        this.currentGame = result;
                        this.gameService.setCurrentGame(this.currentGame);
                        this.createdGame = true;
                        localStorage.setItem('createdGame','yes');
                        let subscription = Observable.interval(100).subscribe((x) => {

                            let findIndex = -1;
                            for (let i = 0; i <= this.games.length; i++) {
                                if (this.currentGame !== undefined && this.games[i] !== undefined && this.currentGame.id === this.games[i].id) {
                                    findIndex = i;
                                }
                            }
                            if (findIndex !== -1) {
                                this.index = findIndex;
                                localStorage.setItem('gameId', '' + this.games[this.index].id);
                                localStorage.setItem('gameIndex', '' + this.index);
                                subscription.unsubscribe();

                            }
                        });
                    }
                );
        }

    }


    ready(): void {
        this.gameService.isReady(this.userService.getCurrentUser())
            .subscribe(
                (result) => {
                },
                (errorData) => {
                }
            );

    }


    join(index: number) {
        let selectedGame = this.games[index]; // Selects the game from the games list
        let user = this.userService.getCurrentUser(); // Gets currentUser information from userService
        let subscription = this.gameService.joinGame(selectedGame, user) // Join game
            .subscribe((result) => subscription.unsubscribe());
        this.inWaitingRoom = true;
        this.gameService.setCurrentGame(selectedGame); // CurrentGame in gameService is updated
        this.index = index;
        localStorage.setItem('gameId','' + this.games[index].id);
        localStorage.setItem('gameIndex', '' + this.index);

    }

    startGame(): void {
        if (this.games[this.index].players.length === 1) {
            this.notificationService.show('There must be at least two players to start your game');
        }
        else if (!this.anyPlayerNotReady(this.index)) {
            this.notificationService.show('All players in your game must be ready to start it');
        }
        else {
            if (this.createdGame) {
                this.gameService.startGame(this.userService.getCurrentUser())
                    .subscribe();
            }
            else {
                this.notificationService.show('Game could not start properly.');
            }
        }

    }

    anyPlayerNotReady(index: number): boolean {
        let allReady = true;
        for (let i = 0; i < this.games[index].players.length; i++) {
            if (this.games[index].players[i].status !== 'IS_READY') {
                allReady = false;
            }
        }
        return allReady;
    }

    logout() {
        this.notificationService.show('You have been logged out.');
        this.inWaitingRoom = false;
        this.createdGame = false;
        this.gamesSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
        this.userService.logoutUser();
        localStorage.clear();

    }

    listenForStart(time = 300) {
        let subscription = Observable.interval(time).subscribe((x) => {
            if (this.index !== -1) {
                if (this.games[this.index].status === 'RUNNING') {
                    this.gameService.setCurrentGame(this.games[this.index]);
                    this.gamesSubscription.unsubscribe();
                    this.userSubscription.unsubscribe();
                    subscription.unsubscribe();
                    this.notificationService.show('Your game is starting, good luck!');
                    this.router.navigate(['/game']);
                }
            }
        });
    }

}