import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game';
import {GameService} from '../../shared/services/game.service';
import {User} from '../../shared/models/user'

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

    currentGame: Game;


    constructor(private gameService: GameService) {
    }

    ngOnInit() {
    }

}
