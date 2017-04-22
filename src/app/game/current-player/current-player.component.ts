import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {GameService} from '../../shared/services/game.service';
import {UserService} from '../../shared/services/user.service';
import {MoveService} from '../../shared/services/move.service';
import {ShipService} from '../../shared/services/ship.service';
import {Game} from "../../shared/models/game";
import {Card} from '../../shared/models/card';
import {isUndefined} from "util";
import {NotificationService} from "../../shared/services/notification.service";

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

    @Input()
    currentUserCards : Card[] = [];


    constructor(private gameService: GameService,
                private userService: UserService,
                private moveService: MoveService,
                private shipService: ShipService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {

    }

    triggerAddStones(): void {
        //call addStones with correct game and user information

        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1];
        let playerToken = this.currentUser.token;

        this.moveService.retrieveStones(gameId, roundId, playerToken)
            .subscribe(result => {
            });
    }




    useCard(cardId: number): void {
        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1];
        let playerToken = this.currentUser.token;
        this.moveService.useCard(gameId, roundId, playerToken, cardId)
            .subscribe((result) => {
                },
                (error) => {
                    this.notificationService.showNotification(error._status + '\n' + error._body, 2)
                }
            );
    }
}
