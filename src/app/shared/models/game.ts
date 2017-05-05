import {User} from './user';
import {Points} from './points';

export class Game {
    public id: number;
    public name: string;
    public owner: string;
    public status: string;
    public currentPlayer: number; // is the id of the user
    public nextPlayer: number;  // is also the id of that user
    public rounds: number[];
    public players: User[];
    public siteBoards: number[];    // Stored as the id of that siteboard
    public points: Points; // Stores how many points for each color in the game

    // These are used to signal when one of the blue cards has been played
    public isActionCardHammer: boolean;
    public isActionCardLever: string[];
    public isActionCardChisel: number;
    public isActionCardSail: number;

    public discardedCardsCounter: number;

    public lastAddedStone: string;  //stores the id of the ship and the position of the stone which was last added.
    // at the start of game it contains: 'none-none', after some moves the variable could contain something like '3-2'

    constructor() {
    }
}
