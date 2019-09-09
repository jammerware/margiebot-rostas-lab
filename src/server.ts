import Koa from 'koa';
import Router from 'koa-router';
import { IndexRoute } from './endpoints';
import { SlashPoint } from './endpoints/slash/point';
import { EndpointBuilder } from './endpoints/endpoint-builder';

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

const endpointBuilder = new EndpointBuilder();
endpointBuilder.addGet(IndexRoute);
endpointBuilder.addEndpoint(SlashPoint);
endpointBuilder.build(router);

app.use(router.routes());
app.listen(port);

console.log(`Server running on localhost:${port}.`);