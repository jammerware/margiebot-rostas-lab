import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import { IndexRoute } from './endpoints';
import { SlashPoint } from './endpoints/slash/point';
import { EndpointBuilder } from './endpoints/endpoint-builder';
import { PersistService } from './services/persist.service';
import { InteractiveComponentHandler } from './endpoints/general/interactive-component';

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

const endpointBuilder = new EndpointBuilder(new PersistService());
endpointBuilder.addGet(IndexRoute);
endpointBuilder.addEndpoint(InteractiveComponentHandler);
endpointBuilder.addEndpoint(SlashPoint);
endpointBuilder.build(router);

// body parser has to come first
app.use(KoaBodyParser());
// then routes
app.use(router.routes());
console.log(router.routes());

app.listen(port);

console.log(`Server running on localhost:${port}.`);