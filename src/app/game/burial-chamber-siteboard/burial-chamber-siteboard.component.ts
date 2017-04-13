import {Component, Input, OnInit} from '@angular/core';
import {BurialChamber} from '../../shared/models/burialChamber';

@Component({
    selector: 'burial-chamber-siteboard',
    templateUrl: './burial-chamber-siteboard.component.html',
    styleUrls: ['./burial-chamber-siteboard.component.css']
})
export class BurialChamberSiteboardComponent implements OnInit {
    @Input()
    currentBurialChamber: BurialChamber;
    ngForArray=[0,1,2,3,4,5,6,7,8,9];

    constructor() {
    }

    ngOnInit() {
    }

}
