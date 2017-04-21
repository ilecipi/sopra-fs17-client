import {Component, Input, OnInit} from '@angular/core';
import {Temple} from "../../shared/models/temple";

@Component({
    selector: 'temple-siteboard',
    templateUrl: './temple-siteboard.component.html',
    styleUrls: ['./temple-siteboard.component.css']
})
export class TempleSiteboardComponent implements OnInit {

    @Input()
    private currentTemple: Temple;

    constructor() {
    }

    ngOnInit() {
    }

    getNotEmptyStones(): number {
        let notEmptyStones = 0;
        for (let i = 0; i < this.currentTemple.stones.length; i++) {
            if (this.currentTemple.stones[i] != null) {
                notEmptyStones++;
            }
        }
        return notEmptyStones;
    }

    getPlural(): string {
        if (this.currentTemple.completedRows == 1) {
            return '';
        }
        else return 's';
    }
}
