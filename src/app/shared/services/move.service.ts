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

    addStones(gameId: number, roundId: number, playerToken: string): Observable<string> {
        let bodyString = new URLSearchParams();
        bodyString.set('playerToken', playerToken);

        return this.http.post(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/users', bodyString)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            })
            .catch((error: any) => Observable.throw('Server error in adding stones'));
    }
}
