"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PartySchema_1 = require("../../Models/PartySchema");
class PartiesList {
    constructor() {
    }
    static async getAllParties() {
        return await PartySchema_1.PartySchema.find({}).sort({ publicationDate: -1 });
    }
    static async getPartiesList() {
    }
}
exports.PartiesList = PartiesList;
//# sourceMappingURL=PartiesList.js.map