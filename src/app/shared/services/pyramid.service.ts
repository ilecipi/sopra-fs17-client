import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {Pyramid} from '../models/pyramid';

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

    getPyramid(gameId: number): any {
        return this.http.get(this.apiUrl + '/games/' + gameId + '/pyramid')
            .map((response: Response) => response.json());
    }
}
