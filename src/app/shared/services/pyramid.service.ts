import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Rx";
import {Pyramid} from "../models/pyramid";

@Injectable()
export class PyramidService {
    apiUrl: string;
    currentPyramid: Pyramid;

    constructor(private http: Http) {
        this.apiUrl = environment.apiUrl;
    }

    getCurrentPyramid(): Pyramid {
        return this.currentPyramid;
    }


    pollPyramid(gameId: number) {
        return Observable.interval(1500).flatMap(() => {
            return this.getPyramid(gameId);
        });
    }

    getPyramid(gameId: number) {
        return this.http.get(this.apiUrl + '/games/' + gameId + '/pyramid')
            .map((response: Response) => response.json());
    }
}
