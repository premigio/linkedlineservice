import * as Koa from 'koa';
import Router from 'koa-router';

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
            ctx.body = 'POST PREPARED';
            ctx.status = 202;
        });
    }
}