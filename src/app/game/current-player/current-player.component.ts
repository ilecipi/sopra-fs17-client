import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {GameService} from '../../shared/services/game.service';
import {UserService} from '../../shared/services/user.service';
import {MoveService} from '../../shared/services/move.service';
import {Game} from "../../shared/models/game";

@Component({
    selector: 'current-player',
    templateUrl: './current-player.component.html',
    styleUrls: ['./current-player.component.css']
})
export class CurrentPlayerComponent implements OnInit {
    @Input()
    currentUser: User;
    @Input()
    currentGame: Game; //need to know the current game for sending the addStones move request

    constructor(private gameService: GameService,
                private userService: UserService,
                private moveService: MoveService) {
    }

    ngOnInit() {
    }

    triggerAddStones() {
        //call addStones with correct game and user information

        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length-1];
        let playerToken = this.currentUser.token;

        this.moveService.addStones(gameId,roundId,playerToken)
            .subscribe(result => {
            if (result) {
            } else {
            }
        });
    }
}
