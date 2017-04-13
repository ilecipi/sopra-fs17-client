import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Rx";
import {BurialChamber} from '../models/burialChamber';

@Injectable()
export class BurialChamberService {
  apiUrl: string;
  currentBurialChamber: BurialChamber;

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  getCurrentBurialChamber(): BurialChamber {
    return this.currentBurialChamber;
  }

  pollBurialChamber(gameId: number) {
    return Observable.interval(1500).flatMap(() => {
      return this.getBurialChamber(gameId);
    });
  }

  getBurialChamber(gameId: number) {
    return this.http.get(this.apiUrl + '/games/' + gameId + '/burialChamber')
        .map((response: Response) => response.json());
  }
}
