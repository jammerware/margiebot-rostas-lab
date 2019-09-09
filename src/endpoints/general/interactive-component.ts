import Koa from 'koa';
import Router from 'koa-router';
import { RouteHandler } from "../route-handler";

export class InteractiveComponentHandler implements RouteHandler {
    /* 
        {"type":"block_actions","team":{"id":"T6XQ79W79","domain":"ssc-pitt"},"user":{"id":"UMUCHB37Y","username":"ben.s.stein","name":"ben.s.stein","team_id":"T6XQ79W79"},"api_app_id":"AN4CP9RUL","token":"xghfqcLRjxF8mtMohUWN38q7","container":{"type":"message","message_ts":"1568054538.000800","channel_id":"GMT4ARJSW","is_ephemeral":false},"trigger_id":"755874697927.235823336247.2fb0d762d1cbe45b888355880907b014","channel":{"id":"GMT4ARJSW","name":"privategroup"},"message":{"type":"message","subtype":"bot_message","text":"Awww, shucks. I bet ben.s.stein sure appreciates that. They\'ve got a brand new point!","ts":"1568054538.000800","bot_id":"BN5U5M18D","blocks":[{"type":"section","block_id":"GhQRY","text":{"type":"mrkdwn","text":"Awww, shucks. I bet ben.s.stein sure appreciates that. They\'ve got a brand new point!","verbatim":false}},{"type":"actions","block_id":"Ngvg","elements":[{"type":"button","action_id":"yci","text":{"type":"plain_text","text":"See the scoreboard","emoji":true}}]}]},"response_url":"https:\\/\\/hooks.slack.com\\/actions\\/T6XQ79W79\\/747604228513\\/elZbkoTmdAZjY1amLVE7dIv0","actions":[{"action_id":"yci","block_id":"Ngvg","text":{"type":"plain_text","text":"See the scoreboard","emoji":true},"type":"button","action_ts":"1568054670.119620"}]}' }
    */
    getHandler(): (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => Promise<void> {
        return async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
            console.log("Here comes the interactivity!", ctx.request.body);
            ctx.response.status = 200;
        };
    }

    getRoute(): string {
        return '/general/interactive-component';
    }
}