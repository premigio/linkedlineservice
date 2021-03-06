import 'reflect-metadata';

import Koa from 'koa';
import { prepareKoa } from './router';
import { createLogFileIfNonExistant } from './logConfigUtil';
import winston from "winston";
const morgan = require("koa-morgan"); //No typing for the library, Javascript way

const port = 8000;
const filepath : string = "./logs.txt";
const app: Koa = prepareKoa(port);

let transportArray = [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'http.log', level: 'http' }),
    new winston.transports.File({ filename: 'information.log' })
];

// if (process.env.NODE_ENV === "test"){
//     transportArray = [];
// }

export let logger = winston.createLogger({
    exitOnError: false,
    level: 'info',
    transports: transportArray
});

createLogFileIfNonExistant(filepath);

const morganMiddleware = morgan("combined", {
    skip: (req:any, res:any) => res.statusCode < 400,
    stream: {
        write: (msg:string) => logger.http(msg)
    }
});

// Application error logging.
app.on('error', logger.error);
app.use(morganMiddleware);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
}
