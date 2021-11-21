import Koa, {HttpError} from 'koa';
import * as HttpStatus from 'http-status-codes';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import Container from 'typedi';
import { LoggerController } from '../controllers/logger.controller';


function createLoggerRouter() : Router {
    let router = new Router({
        prefix: '/log-service',
    });

    const loggerController: LoggerController = Container.get(LoggerController);

    router.post('/', async (ctx: Koa.Context) => loggerController.postLog(ctx));

    return router;
}

export function prepareKoa(port: number) : Koa {
    port = Number.isInteger(port) ? port : 8000;

    let app: Koa = new Koa();

    // Generic error handling middleware.
    app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
        try {
            await next();
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
                error.status = ctx.status;
                ctx.body = { error };
                ctx.app.emit('error', error, ctx);
            }
        }
    });
    app.use(bodyParser());

    let loggerRouter : Router = createLoggerRouter();

    app.use(loggerRouter.routes());
    app.use(loggerRouter.allowedMethods());

    return app;
}