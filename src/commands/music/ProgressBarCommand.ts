import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class SeekCommand extends BaseCommand {
  constructor() {
    super('재생시간', 'music', [], '현재 재생중인 음악 시간 설정(초 단위)');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      const dasda = client.player.createProgressBar(message, {
        timecodes: true,
      });
      message.channel.send(dasda);
    } else {
      message.channel.send('재생중인 음악이 없습니다!');
    }
  }
}
