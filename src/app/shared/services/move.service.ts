import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Rx";
import {URLSearchParams} from '@angular/http';
import {NotificationService} from "./notification.service";


@Injectable()
export class MoveService {
    apiUrl: string;

    constructor(private http: Http,
                private notificationService: NotificationService) {
        this.apiUrl = environment.apiUrl;

    }

    retrieveStones(gameId: number, roundId: number, playerToken: string): Observable<string> {
        let bodyString = new URLSearchParams();
        bodyString.set('playerToken', playerToken);

        return this.http.post(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/users', bodyString)
            .map(res => res.json());

    }

    addStone(gameId: number, roundId: number, shipId: number, playerToken: string, stonePosition: number): Observable<string> {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId
            + '/ships/' + shipId + '?playerToken=' + playerToken
            + '&position=' + stonePosition, options)
            .map(res => res.json());
    }


    sailShipToSiteBoard(gameId: number, roundId: number, shipId: number, siteBoardType: string, playerToken: string): Observable<string> {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.put(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId
            + '/ships/' + shipId + '?siteBoardsType=' + siteBoardType
            + '&playerToken=' + playerToken, options)
            .map(res => res.json());
    }

    pickCard(gameId: number, roundId: number, playerToken: string, position: number): Observable<string> {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/market?playerToken=' + playerToken + '&position=' + position, options)
            .map(res => res.json());

    }

    fastForward(gameId: number) {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.put(this.apiUrl + '/games/' + gameId + '/fastforward', options)
            .map(res => res.json());

    }

    useCard(gameId: number, roundId: number, playerToken: string, marketCardId: number): Observable<string> {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.put(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId
            + '/marketcard' + '?playerToken=' + playerToken + '&marketCardId=' + marketCardId, options)
            .map(res => res.json());
    }

    leverCall(gameId: number, roundId: number, playerToken: string, order: string[]) {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        let colorsString = '';

        for (let i = 0; i < order.length; i++) {
            colorsString+=order[i] + ',';
        }

        colorsString=colorsString.substring(0,colorsString.length-1); //remove last comma


        return this.http.put(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId
            + '/lever' + '?playerToken=' + playerToken + '&userColors=' + colorsString, options)
            .map(res => res.json())
    }
}
