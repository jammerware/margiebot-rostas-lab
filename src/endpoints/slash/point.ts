import Koa from 'koa';
import Router from 'koa-router';
import { RouteHandler } from '../route-handler';
import { PersistService } from '../../services/persist.service';

export class SlashPoint implements RouteHandler {
    constructor(private persist: PersistService) { }

    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => Promise<void> {
        return async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
            console.log('body', ctx.request.body);
            ctx.body = {
                response_type: 'in_channel',
                callback_id: "view-scoreboard",
                fallback: "See the scoreboard!",
                blocks: [
                    {
                        type: "section",
                        text: {
                            "type": "mrkdwn",
                            "text": `Awww, shucks. I bet ${ctx.request.body.user_name} sure appreciates **that**. They've got a brand new point!`,
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "action_id": "view-scoreboard",
                                "text": {
                                    "type": "plain_text",
                                    "text": "See the scoreboard",
                                    "emoji": true
                                }
                            },
                        ]
                    }
                ],
            }

            // await this.persist.givePoint("ben!");
            ctx.response.status = 200;
        };
    }

    getRoute(): string {
        return '/slash/point';
    }
}
