import { WebClient } from '@slack/web-api';

export class SlackService {
    getClient() {
        console.log('get client', process.env.MARGIE_BOT_AUTH_TOKEN);
        return new WebClient(process.env.MARGIE_BOT_AUTH_TOKEN);
    }

    async listUsers() {
        const client = this.getClient();
        return await client.users.list();
    }

    async say(message: string, channelId: string) {
        const client = this.getClient();
        await client.chat.postMessage({ channel: channelId, text: message });
    }
}
