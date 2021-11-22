import * as Koa from 'koa';
import { Service } from 'typedi';
import { LoggerService } from '../services/logger.services';


@Service()
export class LoggerController {

    private readonly service: LoggerService;

    constructor(service: LoggerService) {
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
        this.service.processLog(log);

        ctx.body = 'POST PREPARED: ' + log;
        ctx.status = 202;
    }

}