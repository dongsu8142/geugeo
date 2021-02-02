import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class MusicinfoCommand extends BaseCommand {
  constructor() {
    super('음악정보', 'music', [], '음악정보를 보여줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      const track = await client.player.nowPlaying(message);
      message.channel.send(
        `${track.title} - <${track.url}> - ${track.duration}`,
      );
    } else {
      message.channel.send('재생중인 음악이 없습니다!');
    }
  }
}
