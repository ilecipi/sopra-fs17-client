import {Injectable} from '@angular/core';
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


    //get ships for a round from api
    getShips(gameId: number, roundId: number) {
        let headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/ships', options)
            .map((response: Response) => response.json());
    }


    //get a ship from api
            getShipId(gameId: number, roundId: number, shipId: number){
                let headers = new Headers({'Content-Type': 'application/json'})
                let options = new RequestOptions({headers: headers});

                return this.http.get(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/ships/' + shipId, options)
                    .map((response: Response) => response.json());
            }


            //dock a ship by drag and drop
            onDrop(e: any, ships: Ship[], dock = [], siteboard: number) {
                if(e.dragData.isReady == false) return;
                else if (dock.length > 0) return;
                else {
            dock.push(e.dragData);
            this.removeShip(e.dragData, ships);
            e.dragData.docked = true;
            e.dragData.siteBoard = siteboard;
        }

        //TODO: end of round
        //round ends if there are no more ships to sail -> for all ship.docked = true

    }

    //removes ship from original spot
    removeShip(ship: any, list: Array<any>) {
        let index = list.map((e) => {
            return e.id
        }).indexOf(ship.id);
        list.splice(index, 1);
    }
}
