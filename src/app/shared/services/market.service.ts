import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Rx";
import {Market} from "../models/market";
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

  pollMarket(gameId: number) {
    return Observable.interval(1500).flatMap(() => {
      return this.getMarket(gameId);
    });
  }

  getMarket(gameId: number) {
    return this.http.get(this.apiUrl + '/games/' + gameId + '/market')
        .map((response: Response) => response.json());
  }

}
