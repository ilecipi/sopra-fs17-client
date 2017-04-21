import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Rx";
import {URLSearchParams} from '@angular/http';


@Injectable()
export class MoveService {
    apiUrl: string;

    constructor(private http: Http) {
        this.apiUrl = environment.apiUrl;

    }

    retrieveStones(gameId: number, roundId: number, playerToken: string): Observable<string> {
        let bodyString = new URLSearchParams();
        bodyString.set('playerToken', playerToken);

        return this.http.post(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/users', bodyString)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            })
            .catch((error: any) => Observable.throw('Server error in adding stones'));
    }

    addStone(gameId: number, roundId: number, shipId: number, playerToken: string, stonePosition: number): Observable<string> {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId
            + '/ships/' + shipId + '?playerToken=' + playerToken
            + '&position=' + stonePosition, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            })
            .catch((error: any) => Observable.throw('Server error in adding a stone to selected ship'));
    }


    sailShipToSiteBoard(gameId: number, roundId: number, shipId: number, siteBoardType: string, playerToken: string): Observable<string> {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.put(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId
            + '/ships/' + shipId + '?siteBoardsType=' + siteBoardType
            + '&playerToken=' + playerToken, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            })
            .catch((error: any) => Observable.throw('Server error in sailing selected ship to this site'));
    }

    pickCard(gameId: number, roundId: number, playerToken: string, position: number): Observable<string> {
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/market?playerToken=' + playerToken + '&position=' + position, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            })
            .catch((error: any) => Observable.throw('Server error in taking a card'));
    }

    fastForward(gameId: number){
        let headers = new Headers();// new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.put(this.apiUrl + '/games/' + gameId + '/fastforward', options)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => Observable.throw('Server error in fast forwarding'));
    }

}
