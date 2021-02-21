import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class SeekCommand extends BaseCommand {
  constructor() {
    super('채널이동', 'music', [], '봇이 들어가있는 채널을 이동시킵니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      const channel = message.member?.voice.channel;
      if (channel) {
        await client.player.moveTo(message, channel);
        message.channel.send(`${channel.name}으로 이동하였습니다.`);
      } else {
        message.channel.send('음성 채널에 연결되어 있지 않습니다!');
      }
    } else {
      message.channel.send('재생중인 음악이 없습니다!');
    }
  }
}
