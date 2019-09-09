import Router from 'koa-router';
import { RouteHandler } from "./route-handler";

export class EndpointBuilder {
    private _gets: RouteHandler[] = [];
    private _handlers: RouteHandler[] = [];

    addEndpoint(THandler: { new(): RouteHandler }) {
        this._handlers.push(new THandler());
    }

    addGet(THandler: { new(): RouteHandler }) {
        this._gets.push(new THandler());
    }

    build(router: Router) {
        for (const handler of this._handlers) {
            router.get(handler.getRoute(), handler.getHandler());
        }

        for (const handler of this._handlers) {
            router.post(handler.getRoute(), handler.getHandler());
        }
    }
}