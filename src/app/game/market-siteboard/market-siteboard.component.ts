import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../../shared/models/card";
import {Market} from "../../shared/models/market";
import {Game} from "../../shared/models/game";
import {User} from "../../shared/models/user";
import {MoveService} from "../../shared/services/move.service";

@Component({
    selector: 'market-siteboard',
    templateUrl: './market-siteboard.component.html',
    styleUrls: ['./market-siteboard.component.css']
})
export class MarketSiteboardComponent implements OnInit {
    @Input() currentMarket: Market;
    @Input() currentGame: Game;
    @Input() currentUser: User;

    constructor(private moveService: MoveService) {
    }

    ngOnInit() {

    }

    getCard(index: number): Card {
        return new Card(this.currentMarket.currentCards[index]);
    }

    pickCard(cardIndex: number): void {
        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1]; //roundId is the last number in the rounds array of the game.
        let playerToken = this.currentUser.token;
        console.log('cardIndex:' + cardIndex);

        this.moveService.pickCard(gameId, roundId, playerToken, cardIndex)
            .subscribe(result => {
                if (result) {
                } else {
                }
            });
    }

}
