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
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
export var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment.apiUrl;
        this.loggedIn = false;
    }
    UserService.prototype.loginUser = function (user) {
        this.currentUser = user;
        this.loggedIn = true;
    };
    UserService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    UserService.prototype.getLoggedStatus = function () {
        return this.loggedIn;
    };
    UserService.prototype.getUsers = function () {
        // add authorization header with token
        var headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new RequestOptions({ headers: headers });
        // get users from api
        return this.http.get(this.apiUrl + '/users', options)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.pollUsers = function (time) {
        var _this = this;
        if (time === void 0) { time = 1500; }
        return Observable.interval(time).flatMap(function () {
            return _this.getUsers();
        });
    };
    UserService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, AuthenticationService])
    ], UserService);
    return UserService;
}());
//# sourceMappingURL=C:/Users/Silvo/Dropbox/UZH/FS17/SOPRA/Git repository/sopra-fs17-group11-client/src/app/shared/services/user.service.js.map