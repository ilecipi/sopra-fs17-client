import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {Market} from '../models/market';
@Injectable()
export class MarketService {
  apiUrl: string;
  currentMarket: Market;

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  getCurrentMarket(): Market {
    return this.currentMarket;
  }

  setDummyMarket(): void {
    this.currentMarket = new Market();
  }

  pollMarket(gameId: number): any {
    return Observable.interval(1500).flatMap(() => {
      return this.getMarket(gameId);
    });
  }

  getMarket(gameId: number): any {
    return this.http.get(this.apiUrl + '/games/' + gameId + '/market')
        .map((response: Response) => response.json());
  }

}
