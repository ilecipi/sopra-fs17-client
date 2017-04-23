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
    public siteBoards: number[];    //stored as the id of that siteboard
    public points: Points; //stores how many points for each color in the game

    //these are used to signal when one of these cards has been played
    public isActionCardHammer: boolean;
    public isActionCardLever: string[];
    public isActionCardChisel: number;
    public isActionCardSail: number;

    constructor() {
    }
}
