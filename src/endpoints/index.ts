import Koa from 'koa';
import Router from 'koa-router';
import { RouteHandler } from './route-handler';

export class IndexRoute {
    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => void {
        return (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
            ctx.body = "Hello, world!";
        };
    }

    getRoute(): string {
        return '/*';
    }
}