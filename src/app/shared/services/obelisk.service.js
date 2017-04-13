"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var environment_1 = require("../../../environments/environment");
var Rx_1 = require("rxjs/Rx");
var obelisk_1 = require("../models/obelisk");
var ObeliskService = (function () {
    function ObeliskService(http) {
        this.http = http;
        this.apiUrl = environment_1.environment.apiUrl;
    }
    ObeliskService.prototype.getCurrentObelisk = function () {
        return this.currentObelisk;
    };
    ObeliskService.prototype.setDummyObelisk = function () {
        this.currentObelisk = new obelisk_1.Obelisk();
    };
    ObeliskService.prototype.pollObelisk = function (gameId) {
        var _this = this;
        return Rx_1.Observable.interval(1500).flatMap(function () {
            return _this.getObelisk(gameId);
        });
    };
    ObeliskService.prototype.getObelisk = function (gameId) {
        return this.http.get(this.apiUrl + '/games/' + gameId + '/obelisk')
            .map(function (response) { return response.json(); });
    };
    ObeliskService = __decorate([
        core_1.Injectable()
    ], ObeliskService);
    return ObeliskService;
}());
exports.ObeliskService = ObeliskService;
