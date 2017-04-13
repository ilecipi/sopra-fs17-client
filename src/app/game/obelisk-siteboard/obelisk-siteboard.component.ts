import {Component, Input, OnInit} from '@angular/core';
import {Obelisk} from "../../shared/models/obelisk";

@Component({
    selector: 'obelisk-siteboard',
    templateUrl: './obelisk-siteboard.component.html',
    styleUrls: ['./obelisk-siteboard.component.css']
})
export class ObeliskSiteboardComponent implements OnInit {
    @Input()
    currentObelisk: Obelisk;

    constructor() {
    }

    ngOnInit() {
    }

}
