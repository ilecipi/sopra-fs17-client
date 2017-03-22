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
import { Http } from "@angular/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
//MIGHT BE NOT A USEFUL CLASS
export var PollingService = (function () {
    function PollingService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment.apiUrl;
    }
    PollingService.prototype.liveTrips = function (driverId) {
        return this.http.get(this.apiUrl + "trips/expanded/?is_live=True&page_size=" + 1 + "&ordering=-started_at&driver_id=" + driverId).map(function (res) { return res.json(); });
    };
    PollingService.prototype.pollLiveTrips = function (driverId, time) {
        var _this = this;
        if (time === void 0) { time = 60000; }
        return Observable.interval(time).flatMap(function () {
            return _this.liveTrips(driverId);
        });
    };
    PollingService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, AuthenticationService])
    ], PollingService);
    return PollingService;
}());
//# sourceMappingURL=C:/Users/Silvo/Dropbox/UZH/FS17/SOPRA/Git repository/sopra-fs17-group11-client/src/app/shared/services/polling.service.js.map