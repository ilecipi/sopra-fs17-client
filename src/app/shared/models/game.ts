import {User} from './user';

export class Game {
    public id: number;
    public name: string;
    public owner: string;
    public status: string;
    //public currentPlayer: type;
    //public nextPlayer: type;
    //public colors: type[];
    //public moves: type[];
    public players: User[];
    //public siteBoards: type[];

    constructor() {
    }
}
