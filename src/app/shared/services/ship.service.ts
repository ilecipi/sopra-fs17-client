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

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
    //selects correct URL on the basis of the environment mode
    this.apiUrl = environment.apiUrl;
  }

  getShips(round: number){
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers});


    return this.http.post(this.apiUrl + '/ships/', options)

  }

}
