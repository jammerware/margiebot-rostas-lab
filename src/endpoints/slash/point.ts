import Koa from 'koa';
import Router from 'koa-router';
import { RouteHandler } from '../route-handler';

export class SlashPoint implements RouteHandler {
    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => void {
        return (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
            ctx.body = "Slash point!";
        };
    }

    getRoute(): string {
        return '/slash/point';
    }
}