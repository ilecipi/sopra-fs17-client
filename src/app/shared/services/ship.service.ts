import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {GameService} from '../services/game.service';

import {Observable} from 'rxjs/Rx';
import {Ship} from '../models/ship';
import {Stone} from '../models/stone';

@Injectable()
export class ShipService {
    private apiUrl: string;
    private currentShips: Ship[];

    constructor(private http: Http,
                private gameService: GameService) {
        // selects correct URL on the environment mode
        this.apiUrl = environment.apiUrl;
    }

    // get ships for a round from backend
    getShips(gameId: number) {
        let rounds = this.gameService.getCurrentGame().rounds;
        let roundId = rounds[rounds.length - 1];

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/ships', options)
            .map((response: Response) => response.json());
    }


    // get a ship from api
    getShipId(gameId: number, roundId: number, shipId: number) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.apiUrl + '/games/' + gameId + '/rounds/' + roundId + '/ships/' + shipId, options)
            .map((response: Response) => response.json());
    }

    getCurrentShips(): Ship[] {
        return this.currentShips;
    }

    setDummyShips(): void {
        let ship1 = new Ship();
        let ship2 = new Ship();
        let ship3 = new Ship();
        let ship4 = new Ship();

        let stone = new Stone();
        stone.color = 'none';

        ship1.id = 1;
        ship1.stones = [stone, stone, stone, stone];
        ship1.isReady = false;
        ship1.addedStones = 0;
        ship1.docked = false;
        ship1.siteBoard = null;

        ship2.id = 1;
        ship2.stones = [stone, stone, stone];
        ship2.isReady = false;
        ship2.addedStones = 0;
        ship2.docked = false;
        ship2.siteBoard = null;

        ship3.id = 1;
        ship3.stones = [stone, stone];
        ship3.isReady = false;
        ship3.addedStones = 0;
        ship3.docked = false;
        ship3.siteBoard = null;

        ship4.id = 1;
        ship4.stones = [stone];
        ship4.isReady = false;
        ship4.addedStones = 0;
        ship4.docked = false;
        ship4.siteBoard = null;


        this.currentShips = [ship1, ship2, ship3, ship4];
    }
}
