"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_1 = require("../shared/models/user");
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService, userService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        this.user = new user_1.User();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authenticationService.login(this.user)
            .subscribe(function (result) {
            if (result) {
                _this.user.token = _this.authenticationService.getToken();
                _this.user.id = _this.authenticationService.getId();
                _this.userService.loginUser(_this.user); //Saves current user into the service UserService
                _this.router.navigate(['/lobby']);
            }
            else {
                console.log('Username already exists');
            }
        });
    };
    LoginComponent.prototype.clearfields = function () {
        this.user.name = '';
        this.user.username = '';
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
