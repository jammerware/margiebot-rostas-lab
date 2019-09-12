import Koa from 'koa';
import Router from 'koa-router';

import { RouteHandler } from "../route-handler";
import { PersistService } from '../../services/persist.service';
import { SlackService } from '../../services/slack.service';

export class InteractiveComponentHandler implements RouteHandler {
    constructor(private persist: PersistService, private slack: SlackService) { }

    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => Promise<void> {
        return async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
            const payloadObject = JSON.parse(ctx.request.body.payload);
            const actionId = payloadObject.actions[0].action_id;

            if (actionId === "view-scoreboard") {
                // show scoreboardy things
                this.slack.say("They want the scoreboard", payloadObject.channel.id);
            }

            ctx.response.status = 200;
        };
    }

    getRoute(): string {
        return '/general/interactive-component';
    }
}