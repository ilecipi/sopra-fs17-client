import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../../environments/environment";

import {Observable} from "rxjs/Rx";
import {Game} from "../models/game";
import {User} from "../models/user";
import {Ship} from '../models/ship';

@Injectable()
export class ShipService {
  private apiUrl: string;

  constructor(private http: Http) {
    //selects correct URL on the basis of the environment mode
    this.apiUrl = environment.apiUrl;
  }


  //get the ships for a round from server
  getShips(roundId: number){
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.apiUrl + 'games/rounds/' + roundId +'/ships', options)
        .map((response: Response) => response.json());
  }

  //
  onDrop(e: any, ships: Ship[], siteboard = []){
    if(siteboard.length > 0){return}
    else {
      siteboard.push(e.dragData);
      this.removeShip(e.dragData, ships);
      }
  }

  //removes ship
  removeShip(ship: any, list: Array<any>) {
    let index = list.map((e) => {return e.id}).indexOf(ship.id);
    list.splice(index, 1);
  }

}
