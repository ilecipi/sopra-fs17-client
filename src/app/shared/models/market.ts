export class Market {
    id: number;
    isOccupied: boolean;
    currentCards: string[]; //Contains the name of each card, if a card has been picked, then it's value is null
    userColors: string[]; //Explanation below
    /*If empty, there is no ship docked at the market and
     there is no need for card selection.
     Otherwise it contains the strings of the colors in order such that the first
     of them is the one who needs to pick a card.*/

    constructor() {
        this.id = 0;
        this.isOccupied = false;
        this.currentCards = ['SAIL', 'SAIL', 'SAIL', 'SAIL'];
        this.userColors = [];
    }
}
