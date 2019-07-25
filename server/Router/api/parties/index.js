"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Partiesrouter = require("koa-router");
const Party_1 = require("../../../Controller/Classes/Party");
const PartiesList_1 = require("../../../Controller/Classes/PartiesList");
const FindPartyService_1 = require("../../../Controller/Services/FindPartyService");
const Map_1 = require("../../../Controller/Classes/Map");
const PartiesRouter = new Partiesrouter({ prefix: '/api/parties' });
PartiesRouter.post('/search', async (ctx, next) => {
    let offset = ctx.request.body.offset || null;
    let limit = ctx.request.body.limit || null;
    let conditions = ctx.request.body.conditions || [];
    let orderBy = ctx.request.body.offset || [];
    try {
        ctx.body = await FindPartyService_1.FindPartyService.findPartiesByFields(offset, limit, conditions, orderBy);
    }
    catch (e) {
        ctx.body = `Error: /n ${e}`;
    }
    ctx.body = 'search /api/parties here';
});
PartiesRouter.get('/all', async (ctx, next) => {
    ctx.body = await PartiesList_1.PartiesList.getAllParties();
});
PartiesRouter.get('/party/:id', async (ctx, next) => {
    let id = ctx.params.id;
    let party = await FindPartyService_1.FindPartyService.findPartyBuId(id);
    if (party) {
        ctx.body = party[0];
    }
    else {
        ctx.body = 'vlad lox';
    }
});
PartiesRouter.post('/newParty', async (ctx, next) => {
    console.log(ctx.request.body);
    let { description, weWant, weHave, peopleNow, peopleMax, address, price, phone, ownerName, location, images, publicationDate } = ctx.request.body;
    let newParty = new Party_1.Party(description, weWant, weHave, peopleNow, peopleMax, address, price, phone, ownerName, location, images, publicationDate);
    try {
        newParty.save();
        ctx.body = 'new party created';
    }
    catch (e) {
        ctx.body = 'Doesn\'t added';
    }
});
PartiesRouter.get('/map', async (ctx, next) => {
    ctx.body = await Map_1.Map.getPartiesPoints();
});
module.exports = PartiesRouter;
//# sourceMappingURL=index.js.map