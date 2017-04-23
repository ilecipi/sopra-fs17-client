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
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'current-player',
    templateUrl: './current-player.component.html',
    styleUrls: ['./current-player.component.css'],
})
export class CurrentPlayerComponent implements OnInit {
    @Input()
    private currentUser: User;
    @Input()
    private currentGame: Game; //need to know the current game for sending the addStones move request

    @Input()
    private currentUserCards: Card[] = [];

    private leverSubscription: any;

    private leverSelection: number[] = [0, 0, 0, 0];
    private leverCounter = 0;



    constructor(private gameService: GameService,
                private userService: UserService,
                private moveService: MoveService,
                private shipService: ShipService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.resetLeverSelection();
        this.leverListener();
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

    leverCall(order: string[]) {
        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1];
        let playerToken = this.currentUser.token;
        this.moveService.leverCall(gameId, roundId, playerToken, order)
            .subscribe((result) => {
                },
                (error) => {
                    this.notificationService.showNotification(error._status + '\n' + error._body, 2)
                }
            );
    }

    showActionCardBlock(): boolean {
        let isCurrentPlayer = this.currentGame.currentPlayer == this.currentUser.id;
        let isChisel = this.currentGame.isActionCardChisel != 0;
        let isSail = this.currentGame.isActionCardSail != 0;
        let isHammer = this.currentGame.isActionCardHammer == true;
        let isLever = this.currentGame.isActionCardLever.length != 0;


        return isCurrentPlayer && (isChisel || isSail || isHammer || isLever);
    }

    leverListener() {
        this.leverSubscription = Observable.interval(100).subscribe(x => {
            if (this.currentGame.isActionCardLever.length != this.leverSelection.length) {
                this.resetLeverSelection();
            }
        })
    }


    resetLeverSelection() {
        console.log(this.leverSelection);
        console.log(this.currentGame.isActionCardLever);

        this.leverSelection = [];
        for (let i = 0; i < this.currentGame.isActionCardLever.length; i++) {
            this.leverSelection.push(0);
        }
        this.leverCounter=0;

    }

    getElementOrder(index: number): number {
        return this.leverSelection[index];
    }


    // executed when the user is selecting a card.
    selected(index: number): void {
        if (this.checkAllSelected()) {
            this.notificationService.showNotification('All colors have already been specified', 2);
        }
        else {
            if (this.leverSelection[index] != 0) {
                this.notificationService.showNotification('This color has already been specified', 2);
            }
            else {
                this.leverCounter++;
                this.leverSelection[index] = this.leverCounter;
            }

        }
    }

    confirmLeverSelection(): void {
        if (!this.checkAllSelected()) {
            this.notificationService.showNotification('You did not specify an order for each color', 2);
        }

        else {
            let result: string[] = [];

            // get out the colors in order
            let counter = 1;
            for (let j = 0; j < this.leverSelection.length; j++) {
                for (let i = 0; i < this.leverSelection.length; i++) {
                    if (this.leverSelection[i] == counter) {
                        result.push(this.currentGame.isActionCardLever[i]);
                    }
                }
                counter++;
            }

            console.log(result);

            this.leverCall(result);
        }
    }


// returns true if all elements have been specified.
    checkAllSelected(): boolean {
        let allSelected = true;
        for (let i = 0; i < this.leverSelection.length; i++) {
            if (this.leverSelection[i] == 0) {
                allSelected = false;
            }
        }
        return allSelected;
    }


}
