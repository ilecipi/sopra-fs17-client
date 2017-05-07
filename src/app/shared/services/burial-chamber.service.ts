import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Rx';
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

  getBurialChamber(gameId: number): any {
    return this.http.get(this.apiUrl + '/games/' + gameId + '/burialChamber')
        .map((response: Response) => response.json());
  }
}
