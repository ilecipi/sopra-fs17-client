var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs/Rx";
import { Game } from "../models/game";
import { environment } from "../../../environments/environment";
export var GameService = (function () {
    function GameService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment.apiUrl;
    }
    GameService.prototype.getGames = function () {
        // add authorization header with token
        var headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new RequestOptions({ headers: headers });
        // get games from api
        return this.http.get(this.apiUrl + '/games', options)
            .map(function (response) { return response.json(); });
    };
    GameService.prototype.pollGames = function (time) {
        var _this = this;
        if (time === void 0) { time = 1500; }
        return Observable.interval(time).flatMap(function () {
            return _this.getGames();
        });
    };
    GameService.prototype.setDummyGame = function () {
        this.currentGame = new Game;
        this.currentGame.name = "DummyGame";
    };
    GameService.prototype.setCurrentGame = function (game) {
        this.currentGame = game;
    };
    GameService.prototype.getCurrentGame = function () {
        return this.currentGame;
    };
    GameService.prototype.createNewGame = function (user) {
        var _this = this;
        var bodyString = JSON.stringify({ name: "NewGame", owner: user.username }); // Stringify payload
        var headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        //create new game with token same as user
        return this.http.post(this.apiUrl + '/games?token=' + user.token, bodyString, options) // ...using post request
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var game = response.json() && response.json();
            if (game) {
                // set token property
                _this.currentGame = game;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentName', JSON.stringify({ name: game.name, owner: game.owner, id: _this.gameId }));
                // return true to indicate successful login
                return game;
            }
            else {
                // return false to indicate failed login
                return null;
            }
        }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error in creating a user'); }); //...errors if
    };
    GameService.prototype.isReady = function (user) {
        console.log(user.token);
        console.log(this.currentGame.id);
        var headers = new Headers(); // ... Set content type to JSON
        //passed user will have ready state on current game
        this.http.put(this.apiUrl + '/games/game/' + this.currentGame.id + "?token=" + user.id, headers);
    };
    GameService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, AuthenticationService])
    ], GameService);
    return GameService;
}());
//# sourceMappingURL=C:/Users/Silvo/Dropbox/UZH/FS17/SOPRA/Git repository/sopra-fs17-group11-client/src/app/shared/services/game.service.js.map