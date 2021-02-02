import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class ShuffleCommand extends BaseCommand {
  constructor() {
    super('셔플', 'music', [], '음악의 재생목록을 섞습니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      client.player.shuffle(message);
      message.channel.send('음악을 섞었습니다.');
    } else {
      message.channel.send('재생중인 음악이 없습니다!');
    }
  }
}
