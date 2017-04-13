import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../../../environments/environment";

import {Obelisk} from "../models/obelisk";
import {Observable} from "rxjs/Rx";


@Injectable()
export class ObeliskService {
    apiUrl: string;
    currentObelisk: Obelisk;

    constructor(private http: Http) {
        this.apiUrl = environment.apiUrl;

    }

    getCurrentObelisk(): Obelisk {
        return this.currentObelisk;
    }

    setDummyObelisk(): void {
        this.currentObelisk = new Obelisk();
    }

    pollObelisk(gameId: number) {
        return Observable.interval(1500).flatMap(() => {
            return this.getObelisk(gameId);
        });
    }

    getObelisk(gameId: number) {
        return this.http.get(this.apiUrl + '/games/' + gameId + '/obelisk')
            .map((response: Response) => response.json());
    }
}
