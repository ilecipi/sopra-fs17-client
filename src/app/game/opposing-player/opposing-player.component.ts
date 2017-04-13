import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game';
import {GameService} from '../../shared/services/game.service';
import {User} from '../../shared/models/user'
import {Card} from "../../shared/models/card";

@Component({
    selector: 'opposing-player',
    templateUrl: './opposing-player.component.html',
    styleUrls: ['./opposing-player.component.css']
})
export class OpposingPlayerComponent implements OnInit {
    @Input()
    opposingUser: User;

    @Input()
    opposingUsersCount: number;

    @Input()
    currentPlayerId: number;

    @Input()
    nextPlayerId: number;

    currentGame: Game;
    currentCards: Card[] = [];


    constructor() {
    }

    ngOnInit() {

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

}
