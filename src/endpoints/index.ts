import Koa from 'koa';
import Router from 'koa-router';
import { RouteHandler } from './route-handler';

export class IndexRoute implements RouteHandler {
    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => Promise<void> {
        return async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
            ctx.body = "Hello, world!";
        };
    }

    getRoute(): string {
        return '/*';
    }
}