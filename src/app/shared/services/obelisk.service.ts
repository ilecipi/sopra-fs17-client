import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {Obelisk} from '../models/obelisk';

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


    getObelisk(gameId: number): any {
        return this.http.get(this.apiUrl + '/games/' + gameId + '/obelisk')
            .map((response: Response) => response.json());
    }
}
