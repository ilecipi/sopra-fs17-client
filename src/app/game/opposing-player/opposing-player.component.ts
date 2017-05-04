import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game';
import {User} from '../../shared/models/user'
import {Card} from '../../shared/models/card';

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

    @Input()
    currentGame: Game;
    currentCards: Card[] = [];


    constructor() {
    }

    ngOnInit() {
    }

    getCards(): Card[] {
        let cardsNames: string[] = [];
        let userId = this.opposingUser.id;
        let cards: Card[] = [];
        for (let i = 0; i <= this.currentGame.players.length; i++) {
            if (this.currentGame.players[i] !== undefined && this.currentGame.players[i].id === userId) {
                cardsNames = this.currentGame.players[i].cards;
            }
        }
        for (let i = 0; i < cardsNames.length; i++) {
            cards.push(new Card(cardsNames[i]));
        }
        return cards;
    }

}
