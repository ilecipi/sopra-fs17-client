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

        console.log('gameId:' + gameId,'roundId'+roundId,'playerToken:' + playerToken,'shipNumber' + shipId,'stonePosition:' + stonePosition);

        return this.http.post(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId
                                + '/ships/' + shipId + '?playerToken=' + playerToken
                                + '&position=' + stonePosition, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            })
            .catch((error: any) => Observable.throw('Server error in adding a stone to selected ship'));
    }
}
