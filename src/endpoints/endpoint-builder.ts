import Router from 'koa-router';
import { RouteHandler } from "./route-handler";
import { PersistService } from '../services/persist.service';
import { SlackService } from '../services/slack.service';

export class EndpointBuilder {
    private _gets: RouteHandler[] = [];
    private _handlers: RouteHandler[] = [];

    constructor(
        private persist: PersistService,
        private slack: SlackService) { }

    addEndpoint(THandler: { new(persist: PersistService, slack: SlackService): RouteHandler }) {
        this._handlers.push(new THandler(this.persist, this.slack));
    }

    addGet(THandler: { new(persist: PersistService, slack: SlackService): RouteHandler }) {
        this._gets.push(new THandler(this.persist, this.slack));
    }

    build(router: Router) {
        for (const handler of this._gets) {
            router.get(handler.getRoute(), handler.getHandler());
        }

        for (const handler of this._handlers) {
            router.post(handler.getRoute(), handler.getHandler());
        }
    }
}
