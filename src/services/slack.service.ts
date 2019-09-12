import Axios from 'axios';

export class SlackService {
    async say(message: string, channelId: string) {
        await Axios.post(
            'https://slack.com/api/chat.postMessage',
            { channel: channelId, text: message },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.MARGIE_BOT_AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}
