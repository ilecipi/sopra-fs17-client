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

        // Before starting checks if there is User information in the browser's session storage
        if(!sessionStorage.getItem('userToken') || !sessionStorage.getItem('userUsername') || !sessionStorage.getItem('userId')){
                this.router.navigate(['/login']); // Navigate to login because not allowed to refresh page or to enter the page name in the url
        }

        let oldUser= new User();
        oldUser.username = sessionStorage.getItem('userUsername');
        oldUser.token = sessionStorage.getItem('userToken');
        oldUser.id = +sessionStorage.getItem('userId');
        this.currentUser = oldUser;
        this.userService.loginUser(oldUser);

        this.gameName = '';

        // Variables setting on init, used to switch between buttons in the lobby
        this.inWaitingRoom = false;
        if ( sessionStorage.getItem('createdGame' )){
            this.createdGame = true;
        }
        else{
            this.createdGame=false;
        }
        this.pressedReady = false;
        if (sessionStorage.getItem('gameId')){
            this.currentGame = new Game();
            this.currentGame.id = +sessionStorage.getItem('gameId');
            this.gameService.setCurrentGame(this.currentGame);

        }


        // Automatically retrieve currentUser information from UserService:
        this.loggedIn = this.userService.getLoggedStatus();
        if (this.loggedIn) {
            this.currentUser = this.userService.getCurrentUser();
        }


        // Fast request at initialization so that do not need to wait for the data to be loaded in the polling
        let subscriptionGames = this.gameService.getGames()
            .subscribe(
                (result) => {
                    this.games = result;
                    subscriptionGames.unsubscribe();
                }
            );

        // Automatically retrieve users and games list information from server:
        this.pollInfo();
        this.listenForStart();
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
                else if (this.currentUser.status === 'IS_READY') {
                    this.pressedReady = true;
                    this.inWaitingRoom = true;
                }
            });
    }



    createNewGame(): void {
        if (this.gameName === undefined || this.gameName === ''){
            this.notificationService.show('Please insert a valid game name');
        }
        else {
            this.gameService.createNewGame(this.currentUser, this.gameName)
                .subscribe(
                    (result) => {
                        // On success save the game which is contained in result.
                        this.currentGame = result;
                        sessionStorage.setItem('gameId', '' + result.id);
                        this.gameService.setCurrentGame(this.currentGame);
                        this.createdGame = true;
                        sessionStorage.setItem('createdGame','yes');
                        let subscription = Observable.interval(100).subscribe((x) => {

                            let findIndex = -1;
                            for (let i = 0; i <= this.games.length; i++) {
                                if (this.currentGame !== undefined && this.games[i] !== undefined && this.currentGame.id === this.games[i].id) {
                                    findIndex = i;
                                }
                            }
                            if (findIndex !== -1) {

                                this.index = findIndex;
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
                // No need to do anything because polling takes care of setting important variables
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
            .subscribe(
                (result) => {
                    this.inWaitingRoom = true;
                    this.gameService.setCurrentGame(selectedGame); // CurrentGame in gameService is updated
                    this.currentGame = selectedGame;
                    this.index = index;
                    sessionStorage.setItem('gameId','' + selectedGame.id);
                    subscription.unsubscribe();
                }
            );

        }

    startGame(): void {
        let index=0;

        for(let i = 0; i < this.games.length; i++){
            if (this.games[i].id === this.currentGame.id){
                index = i;
            }
        }
        if (this.games[index].players.length === 1) {
            this.notificationService.show('There must be at least two players to start your game');
        }

        else if (!this.anyPlayerNotReady(index)) {
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

    // Returns true if all players are READY in the game at index
    anyPlayerNotReady(index: number): boolean {
        let allReady = true;
        for (let i = 0; i < this.games[index].players.length; i++) {
            if (this.games[index].players[i].status !== 'IS_READY') {
                allReady = false;
            }
        }
        return allReady;
    }


    // Redirects to login and clears sessionStorage
    logout() {
        this.notificationService.show('You have been logged out.');
        this.inWaitingRoom = false;
        this.createdGame = false;
        this.gamesSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
        this.userService.logoutUser();

        sessionStorage.clear();

    }

    // Listens and takes care of operations when the game is starting
    listenForStart() {
        let subscription = Observable.interval(300)
            .subscribe(
            () => {
            for(let i=0; i < this.games.length; i++){
                if (this.currentGame !== undefined && this.currentGame !== null && this.games[i].id === this.currentGame.id) {
                    if (this.games[i].status === 'RUNNING') {
                        this.gameService.setCurrentGame(this.games[i]);
                        this.userService.setCurrentUser(this.currentUser);
                        this.gamesSubscription.unsubscribe();
                        this.userSubscription.unsubscribe();
                        this.notificationService.show('Your game is starting, good luck!');
                        this.router.navigate(['/game']);
                        subscription.unsubscribe();
                    }
                }
            }
        });
    }

}