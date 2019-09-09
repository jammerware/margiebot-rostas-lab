import Router from 'koa-router';
import { RouteHandler } from "./route-handler";
import { PersistService } from '../services/persist.service';

export class EndpointBuilder {
    private _gets: RouteHandler[] = [];
    private _handlers: RouteHandler[] = [];

    constructor(private persist: PersistService) { }

    addEndpoint(THandler: { new(persist: PersistService): RouteHandler }) {
        this._handlers.push(new THandler(this.persist));
    }

    addGet(THandler: { new(persist: PersistService): RouteHandler }) {
        this._gets.push(new THandler(this.persist));
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