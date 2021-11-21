import * as Koa from 'koa';
import { Service } from 'typedi';
import { ILoggerService } from '../services/abstract/ilogger.services';


@Service()
export class LoggerController {

    public service: ILoggerService;

    constructor(service: ILoggerService) {
        this.service = service;
    }

    /**
     * POST (/log-service)
     * Posts Log into the csv file
     */
    public async postLog(ctx: Koa.Context) {
        ctx.etag = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();

        var log : string = ctx.request.body?.text;

        if (!log) {
            ctx.status = 400;
            return;
        }

        ctx.body = 'POST PREPARED: ' + log;
        ctx.status = 202;
    }

}