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
        this.currentGame = new Game();

    }

    ngOnInit() {
    }

}
