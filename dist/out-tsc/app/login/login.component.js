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
import { AuthenticationService } from "../shared/services/authentication.service";
import { Router } from "@angular/router";
import { User } from "../shared/models/user";
export var LoginComponent = (function () {
    function LoginComponent(router, _service, _router) {
        this.router = router;
        this._service = _service;
        this._router = _router;
        this.model = {};
        this.loading = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this._service.logout();
        this.user = new User();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this._service.login(this.user)
            .subscribe(function (result) {
            if (result) {
                _this.router.navigate(['/lobby']);
            }
            else {
                _this.error = 'Username exists';
                _this.loading = false;
            }
        });
    };
    LoginComponent.prototype.clearfields = function () {
        this.user.name = '';
        this.user.username = '';
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }), 
        __metadata('design:paramtypes', [Router, AuthenticationService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
//# sourceMappingURL=C:/Users/Silvo/Dropbox/UZH/FS17/SOPRA/Git repository/sopra-fs17-group11-client/src/app/login/login.component.js.map