import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../../environments/environment";

import {GameService} from '../services/game.service';

import {Observable} from "rxjs/Rx";
import {User} from "../models/user";
import {Ship} from '../models/ship';
import {Stone} from '../models/stone';

@Injectable()
export class ShipService {
    private apiUrl: string;
    private currentShips: Ship[];

    constructor(private http: Http,
                private gameService: GameService) {
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
    getShipId(gameId: number, roundId: number, shipId: number) {
        let headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/ships/' + shipId, options)
            .map((response: Response) => response.json());
    }


    //dock a ship by drag and drop
    onSiteboardDrop(e: any, ships: Ship[], dock = [], siteboard: number) {
        //if (e.dragData.isReady == false) return;
        //else
        if (dock.length > 0) return;
        else {
            dock.push(e.dragData);
            this.removeShip(e.dragData, ships);
            e.dragData.docked = true;
            e.dragData.siteBoard = siteboard;
        }

        //TODO: end of round
        //round ends if there are no more ships to sail -> for all ship.docked = true
        if (this.allShipsSailed(ships) == true) {

            //post-request on round-service
            this.gameService.newRound();
        }
    }


    //TODO: place stone on ship via drop
    onShipDrop(e: any) {

    }

    //removes ship from original spot
    removeShip(ship: any, list: Array<any>) {
        let index = list.map((e) => {
            return e.id
        }).indexOf(ship.id);
        list.splice(index, 1);
    }

    //checks whether there are still ships to be sailed
    allShipsSailed(ships: Ship[]): boolean {
        for (let ship of ships) {
            if (ship.docked == false) return false;
        }
        return true;
    }

    pollShips(gameId: number, roundId: number) {
        return Observable.interval(1500).flatMap(() => {
            return this.getShips(gameId, roundId);
        });
    }

    getCurrentShips(): Ship[]{
        return this.currentShips;
    }

    setDummyShips() : void{
        let dummyShips = [];
        let ship = new Ship();

        let stone = new Stone();
        stone.color = 'black';

        ship.id = 1;
        ship.stones = [stone, stone, stone, stone];
        ship.isReady = false;
        ship.addedStones = 4;
        ship.docked = false;
        ship.siteBoard = null;
        dummyShips = [ship, ship, ship, ship];

        this.currentShips=dummyShips;
    }
}
