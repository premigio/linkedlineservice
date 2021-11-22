import 'reflect-metadata';

import Koa from 'koa';
import { prepareKoa } from './router';


const port = 8000;
const app: Koa = prepareKoa(port);

// Application error logging.
app.on('error', console.error);

app.listen(port);
