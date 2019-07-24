"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Apirouter = require("koa-router");
const ApiRouter = new Apirouter({ prefix: '/api' });
ApiRouter.post('/', async (ctx) => {
    console.log('api');
    ctx.body = '/api here';
});
module.exports = ApiRouter;
//# sourceMappingURL=index.js.map