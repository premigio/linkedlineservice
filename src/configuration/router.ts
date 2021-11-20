import * as express from "express";
import {LogServiceController} from "../log-service/logService.controller";

export class Routes {
    public express: express.Application;

    constructor(express: express.Application) {
        this.express = express;
        this.routes();
    }

    // Retorno do POST no caso positivo tem que ser de 202, pois os dados competem entre si.
    // Tenho que usar CONCURRENCIA na API e "Optimistic Lock" para a base.
    private routes() {
        const logServiceController = new LogServiceController(this.express);


    }
}