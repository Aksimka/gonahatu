"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-morgan");
const koaBody = require("koa-body");
const Router = require("koa-router");
const mongoose = require("mongoose");
const socketIO = require('socket.io');
let http = require('http');
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
app.use(function (ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Type');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(router.routes());
app.use(router.allowedMethods());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(partiesRouter.routes());
app.use(partiesRouter.allowedMethods());
app.server = http.createServer(app.callback());
app.listen = (...args) => {
    app.server.listen.call(app.server, ...args);
    return app.server;
};
app.io = socketIO(app.server, {});
app.io.use((socket, next) => {
    let error = null;
    try {
        let ctx = app.createContext(socket.request, new http.OutgoingMessage());
        socket.session = ctx.session;
    }
    catch (err) {
        error = err;
    }
    return next(error);
});
app.listen(process.env.PORT || 3000, function () {
    console.log(`server listening on http://localhost:${process.env.PORT || 3000}`);
});
//# sourceMappingURL=index.js.map