"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var game_1 = require("../models/game");
var environment_1 = require("../../../environments/environment");
var GameService = (function () {
    function GameService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment_1.environment.apiUrl;
    }
    GameService.prototype.getGames = function () {
        // add authorization header with token
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        // get games from api
        return this.http.get(this.apiUrl + '/games', options)
            .map(function (response) { return response.json(); });
    };
    GameService.prototype.pollGames = function (time) {
        var _this = this;
        if (time === void 0) { time = 1500; }
        return Rx_1.Observable.interval(time).flatMap(function () {
            return _this.getGames();
        });
    };
    GameService.prototype.setDummyGame = function () {
        this.currentGame = new game_1.Game;
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
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        //create new game with token same as user
        return this.http.post(this.apiUrl + '/games?token=' + user.token, bodyString, options) // ...using post request
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var game = response.json() && response.json();
            if (game) {
                // set token property
                _this.currentGame = game;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentName', JSON.stringify({
                    name: game.name,
                    owner: game.owner,
                    id: _this.gameId
                }));
                // return true to indicate successful login
                return game;
            }
            else {
                // return false to indicate failed login
                return null;
            }
        }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error in creating a user'); }); //errors
    };
    GameService.prototype.isReady = function (user) {
        var _this = this;
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token }); // ... Set access rights.
        // let options = new RequestOptions({headers: headers}); // Create a request option
        //passed user will have ready state on current game
        return this.http.put(this.apiUrl + '/games/game/' + this.currentGame.id + "?token=" + user.token, headers)
            .map(function (response) {
            var game = response.json() && response.json();
            if (game) {
                _this.currentGame = game;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('isReadyResponse', JSON.stringify({
                    name: game.name,
                    owner: game.owner,
                    id: _this.gameId
                }));
                // return true to indicate successfully gone ready
                return game;
            }
            else {
                // return false to indicate failed isReady
                return null;
            }
        }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error by updating status to IS_READY'); });
    };
    GameService.prototype.joinGame = function (game, user) {
        var _this = this;
        //TODO: add User to current game, then update currentUser in userService
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.apiUrl + '/games/game/' + game.id + '/player?token=' + user.id, headers)
            .map(function (response) {
            var resp = response.json() && response.json();
            if (resp) {
                _this.currentGame = game;
                return game;
            }
            else {
                return null;
            }
        })
            .catch(function (error) { return Rx_1.Observable.throw('Server error in joining a game'); });
    };
    GameService = __decorate([
        core_1.Injectable()
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
