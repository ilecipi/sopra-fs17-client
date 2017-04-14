import {Component, OnInit} from '@angular/core';
import {Card} from "../../shared/models/card";

@Component({
    selector: 'market-siteboard',
    templateUrl: './market-siteboard.component.html',
    styleUrls: ['./market-siteboard.component.css']
})
export class MarketSiteboardComponent implements OnInit {
    cards: Card[];

    constructor() {
    }

    ngOnInit() {
        this.cards=[];
        this.cards.push(new Card('SAIL'));
        this.cards.push(new Card('SARCOPHAGUS'));
        this.cards.push(new Card('SAIL'));
        this.cards.push(new Card('SAIL'));
    }

}
