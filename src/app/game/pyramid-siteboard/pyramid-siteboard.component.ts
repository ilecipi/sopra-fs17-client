import {Component, Input, OnInit} from '@angular/core';
import {Pyramid} from "../../shared/models/pyramid";

@Component({
    selector: 'pyramid-siteboard',
    templateUrl: './pyramid-siteboard.component.html',
    styleUrls: ['./pyramid-siteboard.component.css']
})
export class PyramidSiteboardComponent implements OnInit {

    @Input()
    currentPyramid: Pyramid;

    constructor() {
    }

    ngOnInit() {
    }

    surplusPoints(color: string): number {
        let surplus = 0;
        for (let i = 14; i < this.currentPyramid.addedStones.length; i++) {
            if (this.currentPyramid.addedStones[i].color == color){
                surplus++;
            }
        }
        return surplus;
    }
}
