"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-morgan");
const koaBody = require("koa-body");
const Router = require("koa-router");
const mongoose = require("mongoose");
var WebSocketServer = require("ws").Server;
let cors = require('koa-cors');
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
    ctx.body = ctx;
});
app.use(cors({}));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(partiesRouter.routes());
app.use(partiesRouter.allowedMethods());
app.listen(process.env.PORT || 3000, function () {
    console.log(`server listening on http://localhost:${process.env.PORT || 3000}`);
});
var wss = new WebSocketServer({ server: app });
console.log("websocket server created");
wss.on("connection", function (ws) {
    var id = setInterval(function () {
        ws.send(JSON.stringify(new Date()), function () { });
    }, 1000);
    console.log("websocket connection open");
    ws.on("close", function () {
        console.log("websocket connection close");
        clearInterval(id);
    });
});
//# sourceMappingURL=index.js.map