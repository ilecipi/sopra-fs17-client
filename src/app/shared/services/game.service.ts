import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
import {Game} from "../models/game";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";

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

    setDummyGame() {
        this.currentGame = new Game;
        this.currentGame.name = "DummyGame";

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

        return this.http.post(this.apiUrl + '/games?token=' + user.token, bodyString, options) // ...using post request
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
        return this.http.put(this.apiUrl + '/games/' + this.currentGame.id + "?token=" + user.token, headers)
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
        let body = new FormData();
        body.append('token', user.token);

        return this.http.post(this.apiUrl + '/games/' + this.currentGame.id + '/start', body)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error in creating a user' || {})); //errors
    }

}
