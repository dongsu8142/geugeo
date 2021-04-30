import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class AutoPlayCommand extends BaseCommand {
    constructor() {
        super('자동재생', 'music', [], '음악을 반복합니다.');
    }
    
    async run(client: DiscordClient, message: Message, args: Array<string>) {
        if (client.player.isPlaying(message)) {
            const queue = client.player.getQueue(message);
            const autoPlay = queue.autoPlay;
            await client.player.setRepeatMode(message, !autoPlay);
            message.channel.send(
              !autoPlay ? '자동재생를 활성화 했습니다.' : '자동재생를 비활성화 했습니다.',
            );
          } else {
            message.channel.send('재생중인 음악이 없습니다!');
          }
    }
}