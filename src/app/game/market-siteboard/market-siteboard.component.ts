import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../../shared/models/card";
import {Market} from "../../shared/models/market";

@Component({
    selector: 'market-siteboard',
    templateUrl: './market-siteboard.component.html',
    styleUrls: ['./market-siteboard.component.css']
})
export class MarketSiteboardComponent implements OnInit {
    @Input() currentMarket: Market;

    constructor() {
    }

    ngOnInit() {

    }

    getCard(index: number): Card {
        return new Card(this.currentMarket.currentCards[index]);
    }

}
