import {Stone} from "./stone";


export class Ship {
    public id: number;
    public stones : Stone[];
    public isReady: boolean;
    public addedStones: number;
    public docked: boolean;
    public siteBoard: number;

    constructor(){

    }
}
