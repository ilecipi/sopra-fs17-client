import {BurialRow} from './burialRow';
export class BurialChamber {
    id: number;
    firstRow: BurialRow;
    secondRow: BurialRow;
    thirdRow: BurialRow;
    isOccupied: boolean;
    insertIndex: number;
    completedRows: number;

    constructor() {
    }
}
