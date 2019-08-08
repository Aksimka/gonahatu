"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Partiesrouter = require("koa-router");
const Party_1 = require("../../../Controller/Classes/Party");
const PartiesList_1 = require("../../../Controller/Classes/PartiesList");
const FindPartyService_1 = require("../../../Controller/Services/FindPartyService");
const Map_1 = require("../../../Controller/Classes/Map");
const PartiesRouter = new Partiesrouter({ prefix: '/api/parties' });
PartiesRouter.get('/all', async (ctx, next) => {
    ctx.body = await PartiesList_1.PartiesList.getAllParties();
});
PartiesRouter.get('/party/:id', async (ctx, next) => {
    let id = ctx.params.id;
    let party = await FindPartyService_1.FindPartyService.findPartyById(id);
    if (party && party[0]) {
        ctx.body = party[0];
    }
    else {
        ctx.body = "No data";
        ctx.response.status = 404;
    }
});
PartiesRouter.post('/search', async (ctx, next) => {
    let offset = ctx.request.body.offset || null;
    let limit = ctx.request.body.limit || null;
    let conditions = ctx.request.body.conditions || [];
    let orderBy = ctx.request.body.orderBy || {};
    try {
        ctx.body = await FindPartyService_1.FindPartyService.findPartiesByFields(offset, limit, conditions, orderBy);
    }
    catch (e) {
        ctx.body = `Error: /n ${e}`;
    }
});
PartiesRouter.post('/newParty', async (ctx, next) => {
    console.log(ctx.request.body);
    let { description, weWant, weHave, peopleNow, peopleMax, address, price, phone, ownerName, location, images, publicationDate, vkLink } = ctx.request.body;
    let newParty = new Party_1.Party(description, weWant, weHave, peopleNow, peopleMax, address, price, phone, ownerName, location, images, publicationDate, vkLink);
    try {
        let userKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        newParty.save(userKey);
        ctx.body = {
            party: newParty,
            partyId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            userKey
        };
    }
    catch (e) {
        ctx.body = 'Doesn\'t added';
    }
});
PartiesRouter.put('/party/:id', async (ctx, next) => {
    let id = ctx.params.id;
    let body = ctx.request.body;
    try {
        let res = await Party_1.Party.update(id, body);
        if (res && res.id === +id) {
            ctx.body = 'Successfully';
        }
        else
            ctx.response.status = 404;
    }
    catch (e) {
        ctx.response.status = 404;
        console.log(e);
    }
});
PartiesRouter.put('/party/:id/newMember', async (ctx, next) => {
    let id = ctx.params.id;
    let res = await Party_1.Party.oneMoreMember(id);
    res.nModified ? ctx.body = 'Successfully' : ctx.response.status = 404;
});
PartiesRouter.del('/party/:id', async (ctx, next) => {
    let id = ctx.params.id;
    let userKey = ctx.header['access-key'];
    let res = await Party_1.Party.delete(id, userKey);
    if (res && res.id === +id) {
        ctx.response.status = 200;
        ctx.body = 'Succesfully deleted';
    }
    else {
        ctx.response.status = 500;
        ctx.body = res;
    }
});
PartiesRouter.get('/map', async (ctx, next) => {
    ctx.body = await Map_1.Map.getPartiesPoints();
});
module.exports = PartiesRouter;
//# sourceMappingURL=index.js.map