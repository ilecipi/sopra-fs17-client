import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {MoveService} from '../../shared/services/move.service';
import {Game} from '../../shared/models/game';
import {Card} from '../../shared/models/card';
import {NotificationService} from '../../shared/services/notification.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'current-player',
    templateUrl: './current-player.component.html',
    styleUrls: ['./current-player.component.css'],
})
export class CurrentPlayerComponent implements OnInit {
    @Input()
    public currentUser: User;
    @Input()
    public currentGame: Game; // Need to know the current game for sending the addStones move request

    @Input()
    private currentUserCards: Card[] = [];

    private leverSubscription: any;

    private leverSelection: number[] = [0, 0, 0, 0];
    private leverCounter = 0;



    constructor(private moveService: MoveService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.resetLeverSelection();
        this.leverListener();
    }

    retrieveStones(): void {
        // Call addStones with correct game and user information

        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1];
        let playerToken = this.currentUser.token;

        this.moveService.retrieveStones(gameId, roundId, playerToken)
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


    useCard(cardId: number): void {
        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1];
        let playerToken = this.currentUser.token;
        this.moveService.useCard(gameId, roundId, playerToken, cardId)
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

    leverCall(order: string[]) {
        let gameId = this.currentGame.id;
        let roundId = this.currentGame.rounds[this.currentGame.rounds.length - 1];
        let playerToken = this.currentUser.token;
        this.moveService.leverCall(gameId, roundId, playerToken, order)
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

    showActionCardBlock(): boolean {
        let isCurrentPlayer : boolean;
        if(this.currentUser === undefined || this.currentUser === null){
            isCurrentPlayer = false;
        }
        else{
            isCurrentPlayer = this.currentGame.currentPlayer === this.currentUser.id;
        }
        let isChisel = this.currentGame.isActionCardChisel !== 0;
        let isSail = this.currentGame.isActionCardSail !== 0;
        let isHammer = this.currentGame.isActionCardHammer === true;
        let isLever = this.currentGame.isActionCardLever.length !== 0;


        return isCurrentPlayer && (isChisel || isSail || isHammer || isLever);
    }

    leverListener() {
        this.leverSubscription = Observable.interval(100).subscribe(x => {
            if (this.currentGame.isActionCardLever.length !== this.leverSelection.length) {
                this.resetLeverSelection();
            }
        })
    }


    resetLeverSelection() {
        this.leverSelection = [];
        for (let i = 0; i < this.currentGame.isActionCardLever.length; i++) {
            this.leverSelection.push(0);
        }
        this.leverCounter = 0;

    }

    getElementOrder(index: number): number {
        return this.leverSelection[index];
    }


    // executed when the user is selecting a card.
    selected(index: number): void {
        if (this.checkAllSelected()) {
            this.notificationService.show('All colors have already been specified');
        }
        else {
            if (this.leverSelection[index] !== 0) {
                this.notificationService.show('This color has already been specified');
            }
            else {
                this.leverCounter++;
                this.leverSelection[index] = this.leverCounter;
            }

        }
    }

    confirmLeverSelection(): void {
        if (!this.checkAllSelected()) {
            this.notificationService.show('You did not specify an order for each color');
        }

        else {
            let result: string[] = [];

            // get out the colors in order
            let counter = 1;
            for (let j = 0; j < this.leverSelection.length; j++) {
                for (let i = 0; i < this.leverSelection.length; i++) {
                    if (this.leverSelection[i] === counter) {
                        result.push(this.currentGame.isActionCardLever[i]);
                    }
                }
                counter++;
            }

            this.leverCall(result);
        }
    }


// returns true if all elements have been specified.
    checkAllSelected(): boolean {
        let allSelected = true;
        for (let i = 0; i < this.leverSelection.length; i++) {
            if (this.leverSelection[i] === 0) {
                allSelected = false;
            }
        }
        return allSelected;
    }


}
