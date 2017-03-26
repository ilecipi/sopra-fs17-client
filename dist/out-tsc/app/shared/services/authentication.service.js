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
import { Http, Headers, RequestOptions, Jsonp } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { environment } from "../../../environments/environment";
export var AuthenticationService = (function () {
    function AuthenticationService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        // set url dinamically
        this.apiUrl = environment.apiUrl;
    }
    AuthenticationService.prototype.login = function (user) {
        var _this = this;
        var bodyString = JSON.stringify({ name: user.name, username: user.username }); // Stringify payload
        var headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.apiUrl + '/users', bodyString, options) // ...using post request
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json() && response.json();
            if (user) {
                // set token property
                _this.token = user.token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: _this.token }));
                // return true to indicate successful login
                return user;
            }
            else {
                // return false to indicate failed login
                return null;
            }
        }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error in creating a user'); }); //...errors if
    };
    AuthenticationService.prototype.getToken = function () {
        return this.token;
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthenticationService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Jsonp])
    ], AuthenticationService);
    return AuthenticationService;
}());
//# sourceMappingURL=C:/Users/Silvo/Dropbox/UZH/FS17/SOPRA/Git repository/sopra-fs17-group11-client/src/app/shared/services/authentication.service.js.map