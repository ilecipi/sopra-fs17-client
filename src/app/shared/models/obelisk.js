"use strict";
var obeliskTowers_1 = require("./obeliskTowers");
var Obelisk = (function () {
    function Obelisk() {
        this.obelisks = new obeliskTowers_1.ObeliskTowers();
        this.id = 1;
    }
    return Obelisk;
}());
exports.Obelisk = Obelisk;
