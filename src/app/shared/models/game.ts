import {User} from './user';

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

    constructor() {
    }
}
