import Koa from 'koa';
import Router from 'koa-router';

export interface RouteHandler {
    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => void;
    getRoute(): string;
}