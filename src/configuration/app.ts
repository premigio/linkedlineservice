import 'reflect-metadata';

import Koa from 'koa';
import { prepareKoa } from './router';
import { createLogFileIfNonExistant } from './logConfigUtil';


const port = 8000;
const filepath : string = "./logs.txt";
const app: Koa = prepareKoa(port);

createLogFileIfNonExistant(filepath);

// Application error logging.
app.on('error', console.error);

app.listen(port);
