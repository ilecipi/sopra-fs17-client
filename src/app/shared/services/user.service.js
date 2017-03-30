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
var user_1 = require("../models/user");
var environment_1 = require("../../../environments/environment");
var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.pollTime = 1500;
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment_1.environment.apiUrl;
        this.loggedIn = false;
    }
    UserService.prototype.loginUser = function (user) {
        this.currentUser = user;
        this.loggedIn = true;
    };
    UserService.prototype.logoutUser = function () {
        this.currentUser = new user_1.User();
    };
    UserService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    UserService.prototype.getLoggedStatus = function () {
        return this.loggedIn;
    };
    UserService.prototype.getUsers = function () {
        // add authorization header with token
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        // get users from api
        return this.http.get(this.apiUrl + '/users', options)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.pollUsers = function (time) {
        var _this = this;
        if (time === void 0) { time = this.pollTime; }
        return Rx_1.Observable.interval(time).flatMap(function () {
            return _this.getUsers();
        });
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
