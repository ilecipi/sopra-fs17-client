import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {Temple} from '../../shared/models/temple';


@Injectable()
export class TempleService {

    apiUrl: String;
    currentTemple: Temple;

    constructor(private http: Http) {
        // selects correct URL on the basis of the environment mode
        this.apiUrl = environment.apiUrl;
    }

    setCurrentTemple(temple: Temple) {
        this.currentTemple = temple;
    }

    getCurrentTemple(): Temple {
        return this.currentTemple;
    }

    setDummyTemple(): void {
        let dummyTemple = new Temple();
        dummyTemple.id = 1;
        dummyTemple.stones = [null, null, null, null];
        dummyTemple.game = 1;
        dummyTemple.isOccupied = true;
        dummyTemple.completedRows = 0;
        dummyTemple.insertIndex = 0;
        this.currentTemple = dummyTemple;
    }

    pollTemple(gameId: number) {
        return Observable.interval(1500).flatMap(() => {
            return this.getTemple(gameId);
        });
    }

    getTemple(gameId: number) {
        return this.http.get(this.apiUrl + '/games/' + gameId + '/temple')
            .map((response: Response) => response.json());
    }
}
