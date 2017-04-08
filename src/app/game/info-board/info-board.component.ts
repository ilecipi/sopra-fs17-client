import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game';

@Component({
    selector: 'info-board',
    templateUrl: './info-board.component.html',
    styleUrls: ['./info-board.component.css']
})
export class InfoBoardComponent implements OnInit {
    @Input()
    private currentGame: Game;

    constructor() {
    }

    ngOnInit() {
    }

    getPoints(i: number): number {
        let playerColor = this.currentGame.players[i].color;
        if (playerColor == undefined) return 0;
        if (playerColor === 'brown') {
            return this.currentGame.points.brown;
        }
        else if (playerColor === 'grey') {
            return this.currentGame.points.grey;
        }
        else if (playerColor === 'black') {
            return this.currentGame.points.black;
        }
        else if (playerColor === 'white') {
            return this.currentGame.points.white;
        }
        else {
            return -1; //the color wasn't found and must show invalid number
        }

    }
}
