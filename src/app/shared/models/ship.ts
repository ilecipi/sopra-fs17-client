import {Stone} from "./stone";


export class Ship {
    public id: number;
    public stones : Stone[];
    public isReady: boolean;
    public addedStone: number;
    public docked: boolean;
    public siteBoard: number;

    constructor(){

    }
}
