import Koa, {HttpError} from 'koa';
import * as HttpStatus from 'http-status-codes';
import bodyParser from 'koa-bodyparser';
import {LogServiceController} from "./log-service/logService.controller";

const app: Koa = new Koa();
const port = 8000;

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

const logServiceController: LogServiceController = new LogServiceController(app);

app.use(logServiceController.router.routes());
app.use(logServiceController.router.allowedMethods());

// Application error logging.
app.on('error', console.error);

app.listen(port);
