import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game';
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'info-board',
    templateUrl: './info-board.component.html',
    styleUrls: ['./info-board.component.css']
})
export class InfoBoardComponent implements OnInit {

    @Input()
    private currentGame: Game;
    private counter = 0;
    style1 = document.createElement('style');
    style2 = document.createElement('style');
    style3 = document.createElement('style');
    style4 = document.createElement('style');


    styleSubscription: any;


    constructor() {
    }

    ngOnInit() {
        this.style1.innerHTML = '.order0 {background: linear-gradient(45deg,#ffffff,#000000)}';
        this.style2.innerHTML = '.order1 {background: linear-gradient(45deg,#000000,#ffffff)}';
        this.style3.innerHTML = '.order1 {background: linear-gradient(45deg,#000000,#ffffff)}';
        this.style4.innerHTML = '.order1 {background: linear-gradient(45deg,#000000,#ffffff)}';


        document.getElementsByTagName('game')[0].appendChild(this.style1);
        document.getElementsByTagName('game')[0].appendChild(this.style2);
        document.getElementsByTagName('game')[0].appendChild(this.style3);
        document.getElementsByTagName('game')[0].appendChild(this.style4);
        this.pollColors();
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

    pollColors() {
        Observable.interval(100).subscribe(x => {
            this.getColors();
        })

    }

    getColors(): void {
        if (this.counter % 2 == 0) {
            document.getElementsByTagName('game')[0].removeChild(this.style2);
            document.getElementsByTagName('game')[0].removeChild(this.style1);
            document.getElementsByTagName('game')[0].removeChild(this.style3);
            document.getElementsByTagName('game')[0].removeChild(this.style4);
            this.style1.innerHTML = '.order' + this.counter % 40 + ' {background: #000000}';
            this.style2.innerHTML = '.order' + (this.counter + 1) % 40 + ' {background: #ffffff}';
            this.style3.innerHTML = '.order' + (this.counter + 2) % 40 + ' {background: #000000}';
            this.style4.innerHTML = '.order' + (this.counter + 3) % 40 + ' {background: #ffffff}';

            document.getElementsByTagName('game')[0].appendChild(this.style1);
            document.getElementsByTagName('game')[0].appendChild(this.style2);
            document.getElementsByTagName('game')[0].appendChild(this.style3);
            document.getElementsByTagName('game')[0].appendChild(this.style4);


        }
        else {
            document.getElementsByTagName('game')[0].removeChild(this.style2);
            document.getElementsByTagName('game')[0].removeChild(this.style1);
            document.getElementsByTagName('game')[0].removeChild(this.style3);
            document.getElementsByTagName('game')[0].removeChild(this.style4);
            this.style1.innerHTML = '.order' + this.counter % 40 + ' {background: #ffffff}';
            this.style2.innerHTML = '.order' + (this.counter + 1) % 40 + ' {background: #000000}';
            this.style3.innerHTML = '.order' + (this.counter + 2) % 40 + ' {background: #ffffff}';
            this.style4.innerHTML = '.order' + (this.counter + 3) % 40 + ' {background: #000000}';
            document.getElementsByTagName('game')[0].appendChild(this.style1);
            document.getElementsByTagName('game')[0].appendChild(this.style2);
            document.getElementsByTagName('game')[0].appendChild(this.style3);
            document.getElementsByTagName('game')[0].appendChild(this.style4);


        }
        this.counter++;
    }


}
