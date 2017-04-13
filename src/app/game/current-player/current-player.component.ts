import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {GameService} from '../../shared/services/game.service';
import {UserService} from '../../shared/services/user.service';
import {MoveService} from '../../shared/services/move.service';
import {ShipService} from '../../shared/services/ship.service';
import {Game} from "../../shared/models/game";
import {Card} from '../../shared/models/card';

@Component({
    selector: 'current-player',
    templateUrl: './current-player.component.html',
    styleUrls: ['./current-player.component.css'],
})
export class CurrentPlayerComponent implements OnInit {
    @Input()
    currentUser: User;
    @Input()
    currentGame: Game; //need to know the current game for sending the addStones move request


    currentCards: Card[] = [];

    constructor(private gameService: GameService,
                private userService: UserService,
                private moveService: MoveService,
                private shipService: ShipService) {
    }

    ngOnInit(): void {

        //TODO: remove all cards when we get correct cards from backend
        this.currentCards.push(new Card('BURIAL_CHAMBER_DECORATION'));
        this.currentCards.push(new Card('PYRAMID_DECORATION'));
        this.currentCards.push(new Card('HAMMER'));
        this.currentCards.push(new Card('SAIL'));
        this.currentCards.push(new Card('SARCOPHAGUS'));
        this.currentCards.push(new Card('ENTRANCE'));
        this.currentCards.push(new Card('OBELISK_DECORATION'));
        this.currentCards.push(new Card('LEVER'));
        this.currentCards.push(new Card('TEMPLE_DECORATION'));
        this.currentCards.push(new Card('STATUE'));
        this.currentCards.push(new Card('PAVED_PATH'));
        this.currentCards.push(new Card('CHISEL'));
        //all 12 cards added;
    }

    triggerAddStones(): void {
        //call addStones with correct game and user information

        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1];
        let playerToken = this.currentUser.token;

        this.moveService.addStones(gameId, roundId, playerToken)
            .subscribe(result => {
                if (result) {
                } else {
                }
            });
    }

    //event
    onShipDrop(e: any): void {
        //this.shipService.onShipDrop(e, this.stones, this.ship);
    }

}
