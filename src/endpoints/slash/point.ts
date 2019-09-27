import Koa from 'koa';
import Router from 'koa-router';
import { RouteHandler } from '../route-handler';
import { PersistService } from '../../services/persist.service';
import { SlackService } from '../../services/slack.service';

export class SlashPoint implements RouteHandler {
    constructor(private persist: PersistService, private slack: SlackService) { }

    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => Promise<void> {
        return async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
            console.info('point body', ctx.request.body);

            const fromUserId = ctx.request.body.user_id;
            const channelId = ctx.request.body.channel_id;
            const commandText = ctx.request.body.text as string;
            const args = this.getArgs(commandText);
            const tokens = commandText.split(/\s+/g);

            if (!args.userId) {
                await this.slack.say("Awww. Ya gotta tell me who gets the point, ya big silly! :P", channelId);
                return;
            }

            if (args.userId === fromUserId) {
                await this.slack.say("You big goof. Ya can't point yourself! What kinda game would that be?", channelId);
            }

            // score
            await this.persist.givePoint({
                fromUserId,
                userId: args.userId,
                reason: args.reason,
            });

            // compose message body based on who's getting the point
            ctx.body = this.getScoringMessage(args.userId);

            // all done
            ctx.response.status = 200;
        };
    }

    getRoute(): string {
        return '/slash/point';
    }

    private getArgs(commandText: string) {
        const tokens = commandText.split(/\s+/g);

        if (tokens.length === 0) {
            return { userId: undefined, reason: undefined };
        }

        const userNameMatch = tokens[0].match(/\<@([a-zA-Z0-9]+)\|\S+\>(.*)/);
        if (!userNameMatch || userNameMatch.length !== 3) {
            return { userId: undefined, reason: undefined };
        }

        return {
            userId: userNameMatch[1],
            reason: userNameMatch[2].trim(),
        };
    }

    private getScoringMessage(targetUserId: string) {
        return {
            response_type: 'in_channel',
            callback_id: "view-scoreboard",
            fallback: "See the scoreboard!",
            blocks: [
                {
                    type: "section",
                    text: {
                        "type": "mrkdwn",
                        "text": `Awww, shucks. I bet <@${targetUserId}> sure appreciates **that**. They've got a brand new point!`,
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
        };
    }
}
