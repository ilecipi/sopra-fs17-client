var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { UserService } from "../shared/services/user.service";
import { GameService } from "../shared/services/game.service";
import { User } from "../shared/models/user";
export var LobbyComponent = (function () {
    function LobbyComponent(userService, gameService) {
        this.userService = userService;
        this.gameService = gameService;
        this.users = [];
        this.games = [];
    }
    LobbyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get all users from the server and put them in the user list
        this.userService.getUsers()
            .subscribe(function (users) {
            _this.users = users;
        });
        //get all games from the server and put them in the games list
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
            this.currentUser = new User();
            this.currentUser.name = 'Dummy';
            this.currentUser.username = 'DonDon';
        }
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
    LobbyComponent = __decorate([
        Component({
            selector: 'app-lobby',
            templateUrl: './lobby.component.html',
            styleUrls: ['./lobby.component.css'],
        }), 
        __metadata('design:paramtypes', [UserService, GameService])
    ], LobbyComponent);
    return LobbyComponent;
}());
//# sourceMappingURL=C:/Users/Silvo/Dropbox/UZH/FS17/SOPRA/Git repository/sopra-fs17-group11-client/src/app/lobby/lobby.component.js.map