import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {Game} from "../models/game";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";

@Injectable()
export class GameService {
    private apiUrl: string;
    private currentGame: Game;
    private token: string;

    constructor(private http: Http,
                private authenticationService: AuthenticationService) {
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment.apiUrl;



    }

    getGames(): Observable<Game[]> {
        // add authorization header with token
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        // get users from api
        return this.http.get(this.apiUrl + '/games', options)
            .map((response: Response) => response.json());
    }

    pollGames(time = 1500) {
        return Observable.interval(time).flatMap(() => {
            return this.getGames();
        })
    }

    setCurrentGame(game: Game){
        this.currentGame=game;
    }
    getCurrentGame(){
        return this.currentGame;
    }

    createNewGame(user: User): Observable<Game> {
        let bodyString = JSON.stringify({name: "NewGame", owner: user.username}); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json'});// ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option
        //create new game with token same as user

        return this.http.post(this.apiUrl + '/games?token=' + user.token, bodyString, options) // ...using post request
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let game = response.json() && response.json();
                console.log("got 'till here");

                if (game) {
                    // set token property
                    this.token = game.token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentGame', JSON.stringify({username: user.username, token: this.token}));
                    //set response
                    this.currentGame = JSON.parse(localStorage.getItem('currentGame'));
                    // return true to indicate successful login

                    return game;
                } else {
                    // return false to indicate failed login
                    return null;
                }
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json || 'Server error in creating a game')); //...errors if
    }
}
