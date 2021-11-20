import * as Koa from 'koa';
import Router from 'koa-router';
import { stringify } from 'querystring';

export class LogServiceController {

    public koa: Koa;
    public router: Router;

    constructor(koa: Koa) {
        this.koa = koa;
        this.router = new Router({
            prefix: '/log-service',
        });
        this.createRoutes();
    }

    private createRoutes() {
        this.router.post('/', async (ctx: Koa.Context) => {
            ctx.etag = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();

            var log : string = ctx.request.body?.text;

            console.log(log);

            if (!log) {
                ctx.status = 400;
                return;
            }

            ctx.body = 'POST PREPARED: ' + log;
            ctx.status = 202;
        });
    }
}