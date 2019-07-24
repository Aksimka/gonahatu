"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PartySchema_1 = require("../../Models/PartySchema");
class PartiesList {
    constructor() {
    }
    static getAllParties() {
        return PartySchema_1.PartySchema.find({});
    }
    static getPartiesList() {
    }
}
exports.PartiesList = PartiesList;
//# sourceMappingURL=PartiesList.js.map