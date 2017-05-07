import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ChangeService {
    apiUrl: string;

    constructor(private http: Http) {
        this.apiUrl = environment.apiUrl;
    }


    pollChanges(gameId: number) : Observable<number> {
        return Observable.interval(700).flatMap(() => {
            return this.retrieveCounter(gameId);
        });
    }

    retrieveCounter(gameId: number): Observable<number> {
        let headers = new Headers(); // new empty header
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.get(this.apiUrl + '/games/' + gameId + '/counterChanges', options)
            .map(res => res.json());

    }
}
