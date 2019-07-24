"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class FindPartyService {
    static findPartyById(id) {
        return 0;
    }
    static async findPartiesByFields(_offset = 0, _limit = 15, _conditions, _orderBy = [{ decrease: 'publicationDate' }]) {
        let offset = _offset || null;
        let limit = _limit || null;
        let conditions = _conditions || [{ and: [], or: [] }];
        let orderBy = _orderBy || [];
        const findPartiesByFieldsQuery = new mongoose_1.default.Query();
        findPartiesByFieldsQuery.comment('Search parties query');
        let andQuery = [];
        let orQuery = [];
        conditions.forEach(i => {
            i.and && i.and.length !== 0 && i.and.forEach(j => {
                if (j.field && j.eq) {
                    let obj = {};
                    obj[`${j.field}`] = j.eq;
                    andQuery.push(obj);
                }
                if (j.field && j.like && typeof j.like === 'string') {
                    let obj = {};
                    obj[`${j.field}`] = new RegExp('^' + j.like + '$', "i");
                    andQuery.push(obj);
                }
                else {
                    return {
                        code: 500,
                        status: 'Failed',
                        message: 'Wrong conditions structure, sorry'
                    };
                }
            });
            i.or && i.or.length && i.or.forEach(j => {
                if (j.field && j.eq) {
                    let obj = {};
                    obj[`${j.field}`] = j.eq;
                    orQuery.push(obj);
                }
                if (j.field && j.like && typeof j.like === 'string') {
                    let obj = {};
                    obj[`${j.field}`] = new RegExp('^' + j.like + '$', "i");
                    orQuery.push(obj);
                }
                else {
                    return {
                        code: 500,
                        status: 'Failed',
                        message: 'Wrong conditions structure, sorry'
                    };
                }
            });
        });
        findPartiesByFieldsQuery.and(andQuery);
        findPartiesByFieldsQuery.or(orQuery);
        findPartiesByFieldsQuery.limit(limit).skip(offset);
        let sortQuery = [];
        orderBy.forEach(i => {
            if (i.decrease) {
                let obj = {};
                obj[`${i.decrease}`] = -1;
                sortQuery.push();
            }
            if (i.increase) {
                let obj = {};
                obj[`${i.increase}`] = 1;
                sortQuery.push();
            }
            else {
                return {
                    code: 500,
                    status: 'Failed',
                    message: 'Wrong order structure, sorry'
                };
            }
        });
        findPartiesByFieldsQuery.sort(sortQuery);
        return await findPartiesByFieldsQuery.exec();
    }
}
exports.FindPartyService = FindPartyService;
//# sourceMappingURL=FindPartyService.js.map