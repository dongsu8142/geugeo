import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class StopCommand extends BaseCommand {
  constructor() {
    super('스탑', 'music', [], '음악을 중지합니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      client.player.stop(message);
      message.channel.send('음악을 중지했습니다');
    } else {
      message.channel.send('재생중인 음악이 없습니다!');
    }
  }
}
