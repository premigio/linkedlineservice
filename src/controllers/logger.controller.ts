import * as Koa from 'koa';
import { Service } from 'typedi';
import { LoggerService } from '../services/logger.services';
import {logger} from "../configuration/app";


@Service()
export class LoggerController {

    private readonly service: LoggerService;

    constructor(service: LoggerService) {
        this.service = service;
    }

    /**
     * POST (/log-service)
     * Posts Log into the csv file. 
     * Even though it is not direct, the code does not await so it can be called various times. Therefore, 202 is returned.
     */
    public async postLog(ctx: Koa.Context) {
        let etag = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
        logger.info("New request arrived. E-Tag set to: " + etag);
        ctx.etag = etag;

        var log : string = ctx.request.body?.text;

        if (!log) {
            ctx.status = 400;
            return;
        }

        log = log.replace(/(\r\n|\n|\r)/gm, " ");

        this.service.processLog(log);

        ctx.status = 202;
    }

}