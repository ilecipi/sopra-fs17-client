import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
import {Game} from "../models/game";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";
import {Points} from "../models/points";

@Injectable()
export class GameService {
    private apiUrl: string;
    private currentGame: Game;
    private token: string;
    private gameId: number;
    private isTrueGame: boolean;

    constructor(private http: Http,
                private authenticationService: AuthenticationService) {
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment.apiUrl;
        this.isTrueGame = false;

    }

    updateCurrentGame(): Observable<Game> {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.apiUrl + '/games/' + this.currentGame.id, options)
            .map((response: Response) => response.json());
    }


    getGames(): Observable<Game[]> {
        // add authorization header with token
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        // get games from api
        return this.http.get(this.apiUrl + '/games', options)
            .map((response: Response) => response.json());
    }

    pollGames(time = 1500) {
        return Observable.interval(time).flatMap(() => {
            return this.getGames();

        });
    }

    getTrueGame(): boolean {
        return this.isTrueGame;
    }

    getGame(id: number): Observable<Game> {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.apiUrl + '/games/' + id, options)
            .map((response: Response) => response.json());
    }

    pollGame(id: number) {
        return Observable.interval(1500).flatMap(() => {
            return this.getGame(id);
        });
    }

    setCurrentGame(game: Game) {
        this.currentGame = game;
    }

    getCurrentGame() {
        return this.currentGame;
    }

    createNewGame(user: User): Observable<Game> {
        let bodyString = JSON.stringify({name: "NewGame", owner: user.username}); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json'});// ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option
        //create new game with token same as user

        this.isTrueGame = true;

        return this.http.post(this.apiUrl + '/games?token=' + user.id, bodyString, options) // ...using post request
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let game = response.json() && response.json();
                if (game) {
                    // set token property
                    this.currentGame = game;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentName', JSON.stringify({
                        name: game.name,
                        owner: game.owner,
                        id: this.gameId

                    }));
                    // return true to indicate successful login
                    return game;
                } else {
                    // return false to indicate failed login
                    return null;
                }
                // login successful if there's a jwt token in the response

            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw('Server error in creating a user')); //errors
    }

    isReady(user: User): Observable<string> {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});// ... Set access rights.
        // let options = new RequestOptions({headers: headers}); // Create a request option

        //passed user will have ready state on current game
        return this.http.put(this.apiUrl + '/games/' + this.currentGame.id + "?token=" + user.id, headers)
            .map((response: Response) => {
                let game = response.json() && response.json();
                if (game) {

                    this.currentGame = game;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('isReadyResponse', JSON.stringify({
                        name: game.name,
                        owner: game.owner,
                        id: this.gameId
                    }));
                    // return true to indicate successfully gone ready
                    return game;
                } else {
                    // return false to indicate failed isReady
                    return null;
                }
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw('Server error by updating status to IS_READY'));
    }


    joinGame(game: Game, user: User): Observable<Game> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers}); // Create a request option

        this.isTrueGame = true;

        return this.http.post(this.apiUrl + '/games/' + game.id + '/player?token=' + user.id, options)
            .map((response: Response) => {
                let resp = response.json() && response.json();
                if (resp) {
                    this.currentGame = game;

                    return game;
                } else {
                    return null;
                }
            })
            .catch((error: any) => Observable.throw('Server error in joining a game'));
    }

    startGame(user: User): Observable<string> {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(this.apiUrl + '/games/' + this.currentGame.id + '/start?playerToken=' + user.token, options)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error in creating a user' || {})); //errors
    }


    setDummyGame() {
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
        dummyUser.cards=[];

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
        opposing1.cards=[];

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
        opposing2.cards=[];


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
        opposing3.cards=[];



        let dummyGame = new Game;
        dummyGame.id = 1;
        dummyGame.name = "Game 1";
        dummyGame.owner = "Player 1";
        dummyGame.status = "RUNNING";
        dummyGame.currentPlayer = 1;
        dummyGame.nextPlayer = 2;
        dummyGame.rounds = [1];
        dummyGame.players = [dummyUser, opposing1, opposing2, opposing3];
        dummyGame.points = new Points();
        this.currentGame = dummyGame;
    }


    //new round
    newRound(){
        let headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({headers: headers});

        return this.http.put(this.apiUrl + '/games/' + this.getCurrentGame().id + '/rounds', options)
            .map((response: Response) => response.json());
    }

}
