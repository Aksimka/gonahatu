"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-morgan");
const koaBody = require("koa-body");
const Router = require("koa-router");
const mongoose = require("mongoose");
const PartiesList_1 = require("./Controller/Classes/PartiesList");
var cors = require('koa-cors');
const router = new Router();
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://root:root@honahatu-oszqx.mongodb.net/parties?retryWrites=true&w=majority', { useNewUrlParser: true }).then((res) => {
    console.log('Connection is successful');
}).catch((e) => {
    throw new Error(e);
});
const apiRouter = require('./Router/api/index');
const partiesRouter = require('./Router/api/parties/index');
const app = new Koa();
app.use(koaBody());
app.use(logger('combined'));
router.get('/', async (ctx) => {
    let pattern = {
        "type": "FeatureCollection",
        "features": []
    };
    let parties = await PartiesList_1.PartiesList.getAllParties();
    parties.forEach(i => {
        pattern.features.push({
            "type": "Feature",
            "properties": { "id": `${i.id}` },
            "geometry": {
                "type": "Point",
                "coordinates": [i.location[0], i.location[1]]
            }
        });
    });
    ctx.body = pattern;
});
app.use(cors({}));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(partiesRouter.routes());
app.use(partiesRouter.allowedMethods());
app.listen(process.env.PORT || 3000, function () {
    console.log('server listening on http://localhost:3000');
});
//# sourceMappingURL=index.js.map