import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../shared/models/card';

@Component({
    selector: 'market-card',
    templateUrl: './market-card.component.html',
    styleUrls: ['./market-card.component.css']
})
export class MarketCardComponent implements OnInit {

    @Input()
    currentCard: Card;

    constructor() {
    }

    ngOnInit() {
    }

}
