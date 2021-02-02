import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class SkipCommand extends BaseCommand {
  constructor() {
    super('스킵', 'music', [], '음악을 건너뜁니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      client.player.skip(message);
      message.channel.send('음악을 스킵했습니다.');
    } else {
      message.channel.send('재생중인 음악이 없습니다!');
    }
  }
}
