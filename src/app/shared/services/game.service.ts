import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {Game} from "../models/game";

@Injectable()
export class GameService {
  private apiUrl:string;

  constructor(
      private http: Http,
      private authenticationService: AuthenticationService)
  {
    //filled with our heroku-backend URL
    this.apiUrl = 'https://sopra-fs17-group11.herokuapp.com';
  }

  getGames(): Observable<Game[]> {
    // add authorization header with token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get(this.apiUrl +'/games', options)
        .map((response: Response) => response.json());
  }

}
