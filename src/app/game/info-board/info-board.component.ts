import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game';
import {Observable} from "rxjs/Rx";
import {Ship} from '../../shared/models/ship';

@Component({
    selector: 'info-board',
    templateUrl: './info-board.component.html',
    styleUrls: ['./info-board.component.css']
})
export class InfoBoardComponent implements OnInit {

    @Input()
    private currentGame: Game;
    @Input()
    private currentShips: Ship[];

    private maxAngle = 0;
    private minAngle = 180;
    private discardedAngles = [];


    private counter = 0;
    private showSnake: boolean;
    // styles needed to color cells in scoring track board.
    style1 = document.createElement('style');
    style2 = document.createElement('style');
    style3 = document.createElement('style');
    style4 = document.createElement('style');

    discardedStyle = document.createElement('style');


    styleSubscription: any;


    constructor() {
    }

    ngOnInit() {

        // initialization of style for rotating discarded cards.
        this.discardedStyle.innerHTML = '';
        document.getElementsByTagName('info-board')[0].appendChild(this.discardedStyle);


        this.showSnake = false;
        this.initStyleChildren();
        this.addStyleChildren();
        this.pollColors();
    }

    getShipSrc(index: number): string {
        let numStones = this.currentShips[index].stones.length;
        let stringSrc = '../../../assets/img/ShipWithStones';
        let ship: String = '';
        switch (numStones) {
            case 1 : {
                ship = '1-75';
                break;
            }
            case 2: {
                ship = '2-110';
                break;
            }
            case 3: {
                ship = '3-145';
                break;
            }
            case 4: {
                ship = '4-180';
                break;
            }
        }
        stringSrc += ship;
        stringSrc += 'x36.png';
        return stringSrc;
    }

    getPoints(i: number): number {
        let playerColor = this.currentGame.players[i].color;
        if (playerColor === undefined) return 0;
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
            return -1; // the color wasn't found and must show invalid number
        }

    }

    pollColors(): void {
        this.styleSubscription = Observable.interval(100).subscribe(x => {
            if (this.showSnake) {
                this.setTrackBoardSnake();
            }
            else {
                this.setTrackBoardCells();

            }

            this.updateDiscardedCardsStyle();

        })

    }


    setTrackBoardCells(): void {

        let pointsArray = [];
        let points = this.currentGame.points;
        // push on the pointsArray every color present in currentGame.points with his respective points
        if (points.brown != undefined) {
            pointsArray.push(['brown', points.brown % 40, 'var(--brownStone)']);
        }
        if (points.black != undefined) {
            pointsArray.push(['black', points.black % 40, 'var(--blackStone)']);
        }
        if (points.white != undefined) {
            pointsArray.push(['white', points.white % 40, 'var(--whiteStone)']);
        }
        if (points.grey != undefined) {
            pointsArray.push(['grey', points.grey % 40, 'var(--greyStone)']);
        }

        // important: these two list are "connected" with indexes!
        let distinctScore = []; // is going to contain all distinct scores
        let counts = [];    // is going to contain the amount of time each score presents itself
        for (let i = 0; i < pointsArray.length; i++) {
            if (distinctScore.some(x => x == pointsArray[i][1])) {
                counts[distinctScore.indexOf(pointsArray[i][1])] += 1;
            } else {
                distinctScore.push(pointsArray[i][1]);
                counts.push(1);
            }
        }

        // now need to construct boardStatus such that every row of boardStatus has:
        // first element: the actual score number
        // second element: a list containing the strings that need to be used for that color (e.g. [var(--blackStone),var(--whiteStone)])

        let boardStatus = []; //is going to contain every color of the game
        for (let i = 0; i < distinctScore.length; i++) {
            let element = [];// this is one row in boardStatus
            element.push(distinctScore[i]);
            let colors = [];
            for (let j = 0; j < pointsArray.length; j++) {
                if (distinctScore[i] == pointsArray[j][1]) {
                    colors.push(pointsArray[j][2]); //add every string to be used with that specific score amount
                }
            }
            element.push(colors);
            boardStatus.push(element);
        }

        // now boardStatus has a structure like this:
        // [
        //     [
        //         2,
        //         [
        //             var(--blackStone),
        //             var(--whiteStone)
        //         ]
        //     ],
        //     [
        //         3,
        //          [
        //             var(--brownStone),
        //             var (--greyStone)
        //         ]
        //     ]
        // ]


        // now need to create the style to apply:

        // Each iteration of the function requires the old style to be removed, changed, and then added again
        this.removeStyleChildren();

        // Need to reset the styles before calculating them again.
        // Otherwise there would be bugs in moments where for example from three total styles we would go to only one,
        // actual example being two players with distinct scores that after a while catch up and have the same score.
        this.style1.innerHTML = '';
        this.style2.innerHTML = '';
        this.style3.innerHTML = '';
        this.style4.innerHTML = '';

        // example style: background: linear-gradient(to right, #ffffff,#ffffff 49.9%, #000000 50.1%, #000000);
        let styleCounter = 1;
        for (let i = 0; i < boardStatus.length; i++) {
            let styleString: string = '';
            if (styleCounter == 1) {
                styleString = this.setStyleString(boardStatus, i);
                this.style1.innerHTML = styleString;
            }
            else if (styleCounter == 2) {
                styleString = this.setStyleString(boardStatus, i);
                this.style2.innerHTML = styleString;
            }
            else if (styleCounter == 3) {
                styleString = this.setStyleString(boardStatus, i);
                this.style3.innerHTML = styleString;
            }
            else {
                styleString = this.setStyleString(boardStatus, i);
                this.style4.innerHTML = styleString;
            }
            styleCounter++;
        }
        this.addStyleChildren(); // adds the previously generated styles
    }

    removeStyleChildren(): void {
        document.getElementsByTagName('info-board')[0].removeChild(this.style1);
        document.getElementsByTagName('info-board')[0].removeChild(this.style2);
        document.getElementsByTagName('info-board')[0].removeChild(this.style3);
        document.getElementsByTagName('info-board')[0].removeChild(this.style4);
    }

    addStyleChildren(): void {
        document.getElementsByTagName('info-board')[0].appendChild(this.style1);
        document.getElementsByTagName('info-board')[0].appendChild(this.style2);
        document.getElementsByTagName('info-board')[0].appendChild(this.style3);
        document.getElementsByTagName('info-board')[0].appendChild(this.style4);
    }


    initStyleChildren(): void {
        this.style1.innerHTML = '';
        this.style2.innerHTML = '';
        this.style3.innerHTML = '';
        this.style4.innerHTML = '';
    }

    // snake easter egg
    setTrackBoardSnake(): void {
        this.removeStyleChildren();

        this.style1.innerHTML = '.order' + this.counter + ' {background: radial-gradient(circle,#293f50, #293f50 10%, #648880 20%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 1) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 15%, #648880 25%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 2) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 20%, #648880 30%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 3) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 25%, #648880 35%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 4) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 30%, #648880 40%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 5) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 35%, #648880 45%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 6) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 40%, #648880 50%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 7) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 45%, #648880 55%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 8) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 50%, #648880 60%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 9) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 55%, #648880 65%, rgba(0,0,0,0) );}' +
            '.order' + (this.counter + 10) % 40 + ' {background: radial-gradient(circle,#293f50, #293f50 60%, #648880 70%, rgba(0,0,0,0) );}';
        this.style2.innerHTML = '';
        this.style3.innerHTML = '';
        this.style4.innerHTML = '';

        this.addStyleChildren();

        this.counter++;
        this.counter = this.counter % 40;
    }

    setStyleString(boardStatus: any, i: number): string {// this was such a pain, believe me I coded it... ok with some help, but I still coded it.

        let styleString = '.order' + boardStatus[i][0] + ' { background: linear-gradient( to right, '; //set beginning of styleString

        for (let j = 0; j < boardStatus[i][1].length; j++) {    // for each single color assigned to a score in boardStatus
            let percent = 100 / boardStatus[i][1].length;       // percent that that color occupies in the square based on how many colors are concurrently there
            styleString += boardStatus[i][1][j] + ' ' + percent * (j) + '%, ' +     // first stop of the color
                boardStatus[i][1][j] + ' ' + (percent * (j + 1) - 0.1) + '%, ';     // second stop of the color
        }
        styleString = styleString.substring(0, styleString.length - 2);     // remove last comma and space, which are not needed
        styleString += ');}';    // close parenthesis, and voila, you have your style sir *tips hat*.
        return styleString;
    }

    hiddenButton(): void {
        this.showSnake = !this.showSnake;
    }


    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    updateDiscardedCardsStyle() {
        document.getElementsByTagName('info-board')[0].removeChild(this.discardedStyle);

        this.discardedStyle.innerHTML = ''; //resetting before modifying

        this.getAngles();
        for (let i = 0; i < this.discardedAngles.length; i++) {
            this.discardedStyle.innerHTML += '.discarded-card' + i.toString() + ' {transform: rotate(' + this.discardedAngles[i] + 'deg);' +
                'top: ' + Math.floor(8 * Math.sin(i)) + 'px;' +
                'left: ' + Math.floor(8 * Math.cos(i)) + 'px;' +
                '} ';
        }

        document.getElementsByTagName('info-board')[0].appendChild(this.discardedStyle);

    }

    getAngles(): number[] {
        if (this.discardedAngles.length < this.currentGame.discardedCardsCounter) {
            for (let i = this.discardedAngles.length; i < this.currentGame.discardedCardsCounter; i++) {
                this.discardedAngles.push(this.randomInt(this.maxAngle, this.minAngle));
            }
        }
        else if (this.discardedAngles.length > this.currentGame.discardedCardsCounter) {
            this.discardedAngles = [];
            this.getAngles();
        }
        else {
            return this.discardedAngles;
        }


    }


}

