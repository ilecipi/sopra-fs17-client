import {ObeliskTowers} from "./obeliskTowers";
export class Obelisk {
    id: number;
    obelisks: ObeliskTowers;

    constructor() {
        this.obelisks = new ObeliskTowers();
        this.id=1;
    }

}
