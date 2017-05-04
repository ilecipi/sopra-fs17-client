import {Component, Input, OnInit} from "@angular/core";
import {Card} from "../../shared/models/card";
import {Market} from "../../shared/models/market";
import {Game} from "../../shared/models/game";
import {User} from "../../shared/models/user";
import {MoveService} from "../../shared/services/move.service";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
    selector: 'market-siteboard',
    templateUrl: './market-siteboard.component.html',
    styleUrls: ['./market-siteboard.component.css']
})
export class MarketSiteboardComponent implements OnInit {
    @Input() currentMarket: Market;
    @Input() currentGame: Game;
    @Input() currentUser: User;

    constructor(private moveService: MoveService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {

    }

    getCard(index: number): Card {
        return new Card(this.currentMarket.currentCards[index]);
    }

    pickCard(cardIndex: number): void {
        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1]; // RoundId is the last number in the rounds array of the game.
        let playerToken = this.currentUser.token;
        console.log('cardIndex:' + cardIndex);

        this.moveService.pickCard(gameId, roundId, playerToken, cardIndex)
            .subscribe(
                (result) => {
                    // do nothing because successful
                },
                (errorData) => {
                    if (errorData.status === 403) {
                        let cuts = errorData._body.split('"');
                        // let notification= secondCut[0];
                        this.notificationService.show(cuts[15]);
                    }

                }
            );
    }

    getPlayerNameFromColor(color: string): string {
        for (let i = 0; i < this.currentGame.players.length; i++) {
            if (this.currentGame.players[i].color === color) {
                return this.currentGame.players[i].username;
            }
        }
        return '';
    }
}
