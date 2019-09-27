import Koa from 'koa';
import Router from 'koa-router';
import { RouteHandler } from "../route-handler";
import { PersistService } from '../../services/persist.service';
import { SlackService } from '../../services/slack.service';

export class SlashScoreboard implements RouteHandler {
    constructor(private persist: PersistService, private slack: SlackService) { }

    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => Promise<void> {
        return async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
            const userIdPoints = await this.persist.getPoints();
            const users = await this.slack.listUsers();
            let maxUserNameLength = 0;

            console.log('users', users);
            const userPoints: { userId: string, userHandle: string, points: number }[] = [];
            for (const user of userIdPoints) {

            }
        }
    }

    getRoute(): string {
        return '/slash/scoreboard';
    }
}
