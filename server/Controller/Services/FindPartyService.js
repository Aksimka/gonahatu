"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PartySchema_1 = require("../../Models/PartySchema");
class FindPartyService {
    static async findPartiesByFields(_offset = 0, _limit = 15, _conditions, _orderBy = { publicationDate: 1 }) {
        let offset = _offset || null;
        let limit = _limit || null;
        let conditions = _conditions || [{ and: [], or: [] }];
        let orderBy = _orderBy || {};
        let conds = {};
        conditions.forEach((i, index) => {
            let obj = {};
            if (i.type === 'like') {
                conds[i.field] = {};
                conds[i.field][`$regex`] = new RegExp(`${i.data}`, 'i');
            }
            else {
                conds[i.field] = {};
                conds[i.field][`$${i.type}`] = i.data;
            }
        });
        return await PartySchema_1.PartySchema.find(conds, null, { skip: offset, limit, sort: orderBy });
    }
    static async findPartyById(id) {
        try {
            return await PartySchema_1.PartySchema.find({ id: id });
        }
        catch (e) {
            return 'Not updated';
        }
    }
}
exports.FindPartyService = FindPartyService;
//# sourceMappingURL=FindPartyService.js.map