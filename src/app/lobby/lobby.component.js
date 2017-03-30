"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_1 = require("../shared/models/user");
var LobbyComponent = (function () {
    function LobbyComponent(userService, gameService) {
        this.userService = userService;
        this.gameService = gameService;
        this.users = [];
        this.games = [];
    }
    LobbyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get all users from the server and put them in the user list
        this.userService.getUsers()
            .subscribe(function (users) {
            _this.users = users;
        });
        //Get all games from the server and put them in the games list
        this.gameService.getGames()
            .subscribe(function (games) {
            _this.games = games;
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
            this.currentUser = new user_1.User();
            this.currentUser.name = 'Dummy';
            this.currentUser.username = 'DonDon';
            this.currentUser.token = "42";
            this.currentUser.id = 42;
        }
        this.inWaitingRoom = false;
    };
    //calls polling function for games and users
    LobbyComponent.prototype.pollInfo = function (gameService, userService) {
        var _this = this;
        gameService.pollGames()
            .subscribe(function (games) {
            _this.games = games;
        });
        userService.pollUsers()
            .subscribe(function (users) {
            _this.users = users;
        });
    };
    //method called when button is pressed.
    LobbyComponent.prototype.createNewGame = function () {
        var _this = this;
        if (this.inWaitingRoom) {
        }
        else {
            this.gameService.createNewGame(this.currentUser)
                .subscribe(function (result) {
                _this.currentGame = result;
                _this.gameService.setCurrentGame(_this.currentGame);
            });
            this.currentGame = this.gameService.getCurrentGame();
            this.inWaitingRoom = true;
        }
    };
    LobbyComponent.prototype.ready = function () {
        this.gameService.isReady(this.userService.getCurrentUser())
            .subscribe(function (result) {
            if (result) {
                console.log("User gone ready");
            }
            else {
                console.log("User not gone ready");
            }
        });
    };
    LobbyComponent.prototype.leave = function () {
        this.inWaitingRoom = false;
        this.gameService.setDummyGame();
        //TODO: Need to inform the server about player leaving a waiting room
    };
    LobbyComponent.prototype.join = function (index) {
        var selectedGame = this.games[index]; //selects the game from the games list
        var user = this.userService.getCurrentUser(); //gets currentUser information from userService
        this.gameService.joinGame(selectedGame, user) //join game
            .subscribe(function (result) {
            if (result) {
            }
            else {
            }
        });
        this.inWaitingRoom = true;
        this.gameService.setCurrentGame(selectedGame); //currentGame in gameService is updated
    };
    LobbyComponent.prototype.logout = function () {
        this.userService.logoutUser();
    };
    LobbyComponent = __decorate([
        core_1.Component({
            selector: 'app-lobby',
            templateUrl: './lobby.component.html',
            styleUrls: ['./lobby.component.css'],
        })
    ], LobbyComponent);
    return LobbyComponent;
}());
exports.LobbyComponent = LobbyComponent;
