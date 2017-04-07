import {Component, Input, OnInit} from '@angular/core';
import {Stone} from '../../shared/models/stone';

@Component({
    selector: 'temple-siteboard',
    templateUrl: './temple-siteboard.component.html',
    styleUrls: ['./temple-siteboard.component.css']
})
export class TempleSiteboardComponent implements OnInit {

    @Input()
    stones: Stone[];

    constructor() {
    }

    ngOnInit() {
    }

}
