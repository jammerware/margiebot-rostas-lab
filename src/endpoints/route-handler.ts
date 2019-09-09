import Koa from 'koa';
import Router from 'koa-router';
import { PersistService } from '../services/persist.service';

export interface RouteHandler {
    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => Promise<void>;
    getRoute(): string;
}