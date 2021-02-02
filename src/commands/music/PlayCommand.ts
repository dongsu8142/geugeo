import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class PlayCommand extends BaseCommand {
  constructor() {
    super('플레이', 'music', [], '음악을 재생합니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const content = args.join(' ');
    await client.player.play(message, content, false);
  }
}
