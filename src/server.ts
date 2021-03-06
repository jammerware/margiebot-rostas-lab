import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
require('dotenv').config()
import { IndexRoute } from './endpoints';
import { SlashPoint } from './endpoints/slash/point';
import { EndpointBuilder } from './endpoints/endpoint-builder';
import { PersistService } from './services/persist.service';
import { InteractiveComponentHandler } from './endpoints/general/interactive-component';
import { SlackService } from './services/slack.service';
import { SlashScoreboard } from './endpoints/slash/scoreboard';

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

const endpointBuilder = new EndpointBuilder(new PersistService(), new SlackService());
endpointBuilder.addGet(IndexRoute);
endpointBuilder.addEndpoint(InteractiveComponentHandler);
endpointBuilder.addEndpoint(SlashPoint);
endpointBuilder.addEndpoint(SlashScoreboard);
endpointBuilder.build(router);

// body parser has to come first
app.use(KoaBodyParser());
// then routes
app.use(router.routes());

// start the engine
app.listen(port);

console.log(`Server running on localhost:${port}.`);